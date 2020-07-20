const Sequelize = require('sequelize');

const sequelize = require('../db');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER ,
  amount:Sequelize.INTEGER 
});

module.exports = OrderItem;
