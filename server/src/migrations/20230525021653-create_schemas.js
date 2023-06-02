module.exports = {
  async up(queryInterface) {
    await queryInterface.createSchema('world');
  },

  async down(queryInterface) {
    await queryInterface.dropSchema('world');
  },
};
