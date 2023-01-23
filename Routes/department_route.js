const express = require("express");
const Department = require("../models/department");
const { authenticateToken } = require("./authentication");
const Router = express.Router();


// add department
Router.post("/adddepartment", authenticateToken, async (req, res) => {
    const data = req.body;
    await Department.create(data)
      .then(() => {
        res.status(200).json("Data inserted.");
      })
      .catch((err) => {
        res.status(400).json(err.errors[0].message);
      });
  });

  //get all department
Router.get("/getalldepartment", authenticateToken, async (req, res) => {
    await Department.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  //get particular department
Router.get("/department/:id", authenticateToken, async (req, res) => {
    await Department.findOne({ where: { id: req.params.id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .then((err) => {
        res.status(400).json(err);
      });
  });

  //delete department
Router.delete("/deletedepartment/:id", authenticateToken, async (req, res) => {
    await Department.destroy({ where: { id: req.params.id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  //update department
Router.put("/updatedepartment/:id", authenticateToken, async (req, res) => {
    const data = req.body;
    await Department.update(data, { where: { id: req.params.id } })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  module.exports = Router;