const Sequelize = require("sequelize");
const connection = require("../connection");

const Department = connection.define("department",{
    name:Sequelize.STRING,
})

Department.sync().then(()=>{})

module.exports = Department