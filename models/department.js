const Sequelize = require("sequelize");
const connection = require("../connection");

const Department = connection.define("department", {
  department_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z][a-zA-Z ]*$/i,
    },
  },
  department_email:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: { msg: "Email already in use." },
    validate: {
      isEmail: true,
    },
  },
  department_head:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z][a-zA-Z ]*$/i,
    },
  },
  department_status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
        isIn: ['active', 'inactive', 'archived']
    }
  }
});

Department.sync().then(() => {});

module.exports = Department;
