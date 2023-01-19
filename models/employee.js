const Sequelize = require("sequelize");
const connection = require("../connection");
const Department = require("./department")

const Employee = connection.define("employee",{
    name:Sequelize.STRING,
    designation: Sequelize.STRING,
    hire_date : Sequelize.DATE,
    salary: Sequelize.INTEGER,
})

Employee.belongsTo(Department,{
  foreignKey:"department_id"
})

Employee.sync().then(()=>{})

module.exports = Employee