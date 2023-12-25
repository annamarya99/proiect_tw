const { Sequelize } = require('sequelize');

// Configurare conexiune la baza de date
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Testare conexiune
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexiunea la baza de date a fost stabilită cu succes.');
  } catch (error) {
    console.error('Eroare la conectare la baza de date:', error);
  }
})();

module.exports = sequelize;
