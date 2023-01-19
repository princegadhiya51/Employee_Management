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
  }else {
    let userData = req.body;

    const salt = await bcryptjs.genSalt(10);
    userData.password = await  bcryptjs.hash(userData.password, salt);

    await User.create(userData).then(() => {
      res.status(200).json("Registered successfully.");
    });
  }
});

//login
Router.post("/login", async (req,res)=>{
  const data = await User.findOne({where:{username:req.body.username}})

  if(data == null)
  {
    res.status(400).json("User not found.")
  }
  else{
    const validCred = await bcryptjs.compare(req.body.password,data.password)
    if(!validCred)
    {
      res.status(400).json("Invalid password.")
    }
    else
    {
      const user = {username : req.body.username}

      const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN)
      res.status(200).json({accessToken:accessToken})
    }
  }
})

// add employee
Router.post("/addemployee", authenticateToken ,async (req, res) => {
  const data = req.body;
  await Employee.create(data)
    .then(() => {
      res.status(200).json("Data inserted.");
    })
    .catch((err) => {
      res.status(400).json("Failed." + err);
    });
});

// add department
Router.post("/adddepartment", authenticateToken ,async (req, res) => {
  const data = req.body;
  await Department.create(data)
    .then(() => {
      res.status(200).json("Data inserted.");
    })
    .catch((err) => {
      res.status(400).json("Failed." + err);
    });
});

//get all employee 
Router.get("/getallemployee",authenticateToken ,async (req, res) => {
  const data = await Employee.findAll();
  res.json(data);
});

//get all department 
Router.get("/getalldepartment",authenticateToken ,async (req, res) => {
  const data = await Department.findAll();
  res.json(data);
});

//get particular employee 
Router.get("/employee/:id",authenticateToken ,async (req, res) => {
  const id = req.params.id
  const data = await Employee.findByPk(id)
  res.json(data);
});

//get particular department
Router.get("/department/:id",authenticateToken ,async (req, res) => {
  const id = req.params.id
  const data = await Department.findByPk(id)
  res.json(data);
});

//jwt token authentication
function authenticateToken(req, res, next) {
  if (req.headers.hasOwnProperty("authorization") === false) {
    res.status(403).json("No authorization token found.");
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
