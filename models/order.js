const Sequelize = require('sequelize');

const sequelize = require('../db');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userName:{
   type:Sequelize.STRING
  },
  date:{
    type:Sequelize.DATEONLY,
    default:Sequelize.NOW,
  },
  status:{
    type:Sequelize.STRING,
    default:'Not Delivered'
  }
});

module.exports = Order;