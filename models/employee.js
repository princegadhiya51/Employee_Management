const Sequelize = require("sequelize");
const connection = require("../connection");
const Department = require("./department");

const Employee = connection.define("employee", {
  name: { type: Sequelize.STRING, allowNull: false },
  designation: { type: Sequelize.STRING, allowNull: false },
  hire_date: { type: Sequelize.DATE, allowNull: false },
  salary: { type: Sequelize.INTEGER, allowNull: false },
});

Employee.belongsTo(Department, {
  foreignKey: "department_id",
});

Employee.sync().then(() => {});

module.exports = Employee;
