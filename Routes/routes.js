const express = require("express");
const Department = require("../models/department");
const Employee = require("../models/employee");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
require("dotenv").config();

//register
Router.post("/register", async (req, res) => {
  const data = await User.findOne({ where: { username: req.body.username } });

  if (data != null) {
    res.status(400).json("User already exists.");
  } else {
    let userData = req.body;

    const salt = await bcryptjs.genSalt(10);
    userData.password = await  bcryptjs.hash(userData.password, salt);

    await User.create(userData).then(() => {
      res.status(200).json("Registered successfully.");
    });
  }
});

Router.post("/insert", async (req, res) => {
  const data = req.body;
  await Employee.create(data)
    .then(() => {
      res.status(200).json("Data inserted.");
    })
    .catch((err) => {
      res.status(400).json("Failed." + err);
    });
});

Router.post("/insertDep", async (req, res) => {
  const data = req.body;
  await Department.create(data)
    .then(() => {
      res.status(200).json("Data inserted.");
    })
    .catch((err) => {
      res.status(400).json("Failed." + err);
    });
});

Router.get("/get", async (req, res) => {
  const data = await Employee.findAll();
  res.json(data);
});

//jwt token authentication
function authenticateToken(req, res, next) {
  if (req.headers.hasOwnProperty("authorization") === false) {
    res.status(403);
  } else {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === "null") return res.status(403);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
}

module.exports = Router;
