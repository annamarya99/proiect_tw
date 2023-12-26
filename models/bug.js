// models/Bug.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Project = require('./project'); // Asigură-te că ai importat modelul Project

const Bug = sequelize.define('Bug', {
  numeBug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  severitate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prioritate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkCommit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Adaugă relația "un-la-mulți" cu Project
Bug.belongsTo(Project, {
  foreignKey: {
    allowNull: false,
  },
});

// Relație "un-la-mulți" cu Project
Project.hasMany(Bug);

module.exports = Bug;
