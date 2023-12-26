'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      numeBug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      severitate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prioritate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descriere: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      linkCommit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ProjectId: { // Adăugat pentru a reprezenta cheia externă
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bugs');
  },
};
