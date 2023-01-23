const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const User_Route = require("./Routes/user_route");
const Employee_Route = require("./Routes/employee_route");
const Department_Route = require("./Routes/department_route");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", User_Route);
app.use("/", Employee_Route);
app.use("/", Department_Route);

connection
  .sync()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Failed to connect to the database : ", err);
  });

app.listen(PORT, () => {
  console.log("Server is running...");
});
