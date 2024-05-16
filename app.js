var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

sequelize
  .authenticate()
  .then(() => Employee.sync({ force: true })) // This will drop the table if it already exists
  .then(() =>
    Employee.create({
      name: "John Deo",
      email: "john@gmail.com",
      contact: "9876543210",
      company: "omni",
    })
  )
  .then(() => console.log("Sample user created successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
