// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true // Set to true or false based on your requirements
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true // Set to true or false based on your requirements
  }
}, {
  timestamps: true
});

module.exports = User;
