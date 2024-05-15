const express = require("express");
const router = express.Router();
const { Employee } = require("../models");

// GET route to retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await Employee.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to add a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, contact, company } = req.body;
    const newUser = await Employee.create({ name, email, contact, company });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
