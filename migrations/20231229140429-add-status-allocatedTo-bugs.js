'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bugs', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'nerezolvat', // Setează valoarea implicită pentru status
    });

    await queryInterface.addColumn('Bugs', 'alocatUserului', {
      type: Sequelize.INTEGER,
      allowNull: true, // Sau false, în funcție de cerințe
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bugs', 'status');
    await queryInterface.removeColumn('Bugs', 'alocatUserului');
  },
};