const express = require("express");
const Employee = require("../models/employee");
const { authenticateToken } = require("./authentication");
const Router = express.Router();

// add employee
Router.post("/addemployee", authenticateToken, async (req, res) => {
  const data = req.body;
  await Employee.create(data)
    .then(() => {
      res.status(200).json("Data inserted.");
    })
    .catch((err) => {
      res.status(400).json(err.errors[0].message);
    });
});

//get all employee
Router.get("/getallemployee", authenticateToken, async (req, res) => {
  await Employee.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//get particular employee
Router.get("/employee/:id", authenticateToken, async (req, res) => {
  await Employee.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//delete employee
Router.delete("/deleteemployee/:id", authenticateToken, async (req, res) => {
  await Employee.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//update employee
Router.put("/updateemployee/:id", authenticateToken, async (req, res) => {
  const data = req.body;
  await Employee.update(data, { where: { id: req.params.id } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = Router;