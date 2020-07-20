const Sequelize = require('sequelize');

const sequelize = require('../db');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
 model:{
  type: Sequelize.STRING,
  allowNull: false
},
 reference:{
   type: Sequelize.STRING,
   allowNull: false,
   },
 functions:{
   type: Sequelize.STRING,
   allowNull: false,
   },
 material:{
   type: Sequelize.STRING,
   allowNull: false,
   },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Product;
