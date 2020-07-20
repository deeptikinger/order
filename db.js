const Sequelize = require('sequelize');

const sequelize = new Sequelize('project', 'userproject', 'passproject', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
