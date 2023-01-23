const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
require("dotenv").config();

//register
Router.post("/register", async (req, res) => {
  const data = await User.findOne({ where: { username: req.body.username } });

  if (data != null) {
    return res.status(400).json("User already exists.");
  } else {
    let userData = req.body;

    const salt = await bcryptjs.genSalt(10);
    userData.password = await bcryptjs.hash(userData.password, salt);

    await User.create(userData).then(() => {
        return res.status(200).json("Registered successfully.");
    });
  }
});

//login
Router.post("/login", async (req, res) => {
  const data = await User.findOne({ where: { username: req.body.username } });

  if (data == null) {
    return res.status(404).json("User not found.");
  } else {
    const validCred = await bcryptjs.compare(req.body.password, data.password);
    if (!validCred) {
        return res.status(400).json("Invalid password.");
    } else {
      const user = { username: req.body.username };

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      return res.status(200).json({ accessToken: accessToken });
    }
  }
});

module.exports = Router