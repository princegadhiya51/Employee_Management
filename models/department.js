const Sequelize = require("sequelize");
const connection = require("../connection");

const Department = connection.define("department",{
    name:{ type: Sequelize.STRING, allowNull: false, unique: true },
})

Department.sync().then(()=>{})

module.exports = Department