module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'state', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'state');
  },
};
