module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'status', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'status');
  },
};
