const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');

const Project = db.define('project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  url: Sequelize.STRING
},{
  hooks: {
    beforeCreate(project) {
      const url = slug(project.name).toLowerCase();
      project.url = url;
    }
  }
});

module.exports = Project;