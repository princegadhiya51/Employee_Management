const connection = require("../connection")
const Sequelize = require("sequelize");

const User = connection.define("user",{
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

User.sync().then(()=>{})

module.exports = User