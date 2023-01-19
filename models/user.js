const connection = require("../connection")
const Sequelize = require("sequelize");

const User = connection.define("user",{
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
})

User.sync().then(()=>{})

module.exports = User