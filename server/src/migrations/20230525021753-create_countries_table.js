const tableModel = { schema: 'world', tableName: 'countries' };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(tableModel, {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { allowNull: false, type: Sequelize.STRING },
        population: { allowNull: false, type: Sequelize.INTEGER },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      });

      await queryInterface.addIndex(tableModel, ['id'], { transaction });
      await queryInterface.addIndex(tableModel, ['name'], { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(tableModel);
  },
};
