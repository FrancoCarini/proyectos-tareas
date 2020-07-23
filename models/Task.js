const Sequelize = require('sequelize');
const db = require('../config/db');
const Project = require('./Project')

const Task = db.define('task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Task;