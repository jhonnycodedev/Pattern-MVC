const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync(); // Sincroniza o modelo com o banco de dados

module.exports = User;
