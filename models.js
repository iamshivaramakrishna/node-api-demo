const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.POSTGRES_URL, {
  dialect: config.dialect,
  ssl: config.POSTGRES_URL.includes("sslmode=require"),
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


sequelize
  .authenticate()
  //   .then(() => Employee.sync({ force: true })) // This will drop the table if it already exists
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

// Synchronize the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Employee model synced with database.");
  })
  .then(() => {
    return Employee.create({
      name: "Tom",
      email: "tom@gmail.com",
      contact: "9876543212",
      company: "omni",
    });
  })
  .catch((err) => {
    console.error("Error syncing Employee model:", err);
  });

module.exports = { Employee, sequelize };
