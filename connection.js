const { Sequelize } = require("sequelize") 

const connection = new Sequelize('db','user','pass',{
    host: './db.sqlite',
    dialect: 'sqlite',
})

module.exports = connection