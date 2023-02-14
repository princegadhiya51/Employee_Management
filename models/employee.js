const Sequelize = require("sequelize");
const connection = require("../connection");
const Department = require("./department");

const Employee = connection.define("employee", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z][a-zA-Z ]*$/i,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: { msg: "Email is already in use." },
    validate: {
      isEmail: true,
    },
  },
  mobile_no: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: { msg: "Mobile number is already in use." },
    validate: {
      len: 10,
    },
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { is: /^[a-zA-Z]+$/i },
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  hire_date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isGreaterThanBirthdate(value) {
        if (value <= this.birthdate) {
          throw new Error("Invalid birthdate.");
        }
      },
      isBefore: new Date().toISOString().substr(0, 10),
    },
  },
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { isNumeric: true, min: 0 },
  },
  // skills: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  //   validate: {
  //     isArray: true,
  //   },
  // },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [["Male", "Female"]],
    },
  },
  is_married: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Employee.belongsTo(Department, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

Employee.sync().then(() => {});

module.exports = Employee;
