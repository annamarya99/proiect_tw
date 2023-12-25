const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Importarea instanței Sequelize

const User = sequelize.define('User', {
  // Definirea câmpurilor din tabel
  username: {
    type: DataTypes.STRING, // Poți ajusta tipul de date în funcție de nevoi
    allowNull: true, // Poți să ajustezi la false dacă vrei să fie obligatoriu
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
 

}, {
  timestamps: true, // Adaugă automat coloanele createdAt și updatedAt
});

module.exports = User;
