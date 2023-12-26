const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user'); 


const Project = sequelize.define('Project', {
  numeProiect: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  repository: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  

}, {
  timestamps: true,
});

// Definirea relației "mai mulți la mai mulți" între Proiect și User
Project.belongsToMany(User, { through: 'ProjectUser', as: 'EchipaProiectului' });
User.belongsToMany(Project, { through: 'ProjectUser', as: 'ProiecteUtilizator' });

// Relație "mult-la-mult" între Proiect și User pentru echipa de testare
Project.belongsToMany(User, { through: 'ProiectEchipaTestare', as: 'EchipaTestare' });
User.belongsToMany(Project, { through: 'ProiectEchipaTestare', as: 'ProiecteTestareUtilizator' });




module.exports = Project;
