// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    





/*
var express = require('express');
var router = express.Router();

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/