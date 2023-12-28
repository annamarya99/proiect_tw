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
  tipUtilizator: {
    type: DataTypes.ENUM('MP', 'TST'),
    allowNull: true,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
 

}, {
  timestamps: true, // Adaugă automat coloanele createdAt și updatedAt
});

console.log(User.rawAttributes);

module.exports = User;
