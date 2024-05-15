var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var quotesRouter = require("./routes/quotes");

var app = express();

const { Sequelize } = require("sequelize");
const config = require("./config");

// Create a new Sequelize instance
const sequelize = new Sequelize(
  config.POSTGRES_URL, // Use the direct database URL here
  {
    dialect: config.dialect,
    ssl: config.POSTGRES_URL.includes("sslmode=require"), // Check if SSL is required in the URL
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
    // Additional configurations can be added here if needed
  }
);

// Define a model
const Employee = sequelize.define("employee", {
  // Define model attributes
//   id: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

// firstName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: Sequelize.STRING
//     // allowNull defaults to true
//   }
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
  contact: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
  company: {
    type: Sequelize.STRING,
    // allowNull defaults to true
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // Synchronize the model with the database
    return Employee.sync({ force: true }); // This will drop the table if it already exists
  })
  .then(() => {
    // console.log("User table created successfully.");
    // Insert a sample record
    return Employee.create({ name: "Tom", email: "tom@gmail.com", contact: "9876543212", company: "omni" });
  })
  .then(() => {
    console.log("Sample user created successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/quotes", quotesRouter);



app.get("/users", async (req, res) => {
    try {
      // Retrieve user data including associated addresses
      const users = await Employee.findAll();
  
      // Send the retrieved data as a response
      res.json(users);
    } catch (error) {
      // Handle errors
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // POST route to add a new user
  app.post("/users", async (req, res) => {
      try {
        const { name, email, contact, company } = req.body;
        const newUser = await Employee.create({ name, email, contact, company });
        res.status(201).json(newUser);
      } catch (error) {
        console.error("Error creating user:", error); // Log the error
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

module.exports = app;
