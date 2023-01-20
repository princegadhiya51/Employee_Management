const connection = require("../connection");
const Sequelize = require("sequelize");

const User = connection.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: { msg: "Username is already in use." },
    validate: {
      is: /^[a-zA-Z][a-zA-Z_]*$/i,
    },
  },
  password: { type: Sequelize.STRING, allowNull: false, validate: { len: 8 } },
});

User.sync().then(() => {});

module.exports = User;
