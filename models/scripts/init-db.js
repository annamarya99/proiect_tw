const { sequelize, Project, User } = require('./models'); // Asigură-te că ai calea corectă

// Sincronizare manuală a modelelor cu baza de date
sequelize.sync({ force: true }) // Folosește force: true doar dacă vrei să ștergi tabelele existente
  .then(() => {
    console.log('Modelele au fost sincronizate cu baza de date.');
  })
  .catch((error) => {
    console.error('Eroare la sincronizarea modelelor cu baza de date:', error);
  });
