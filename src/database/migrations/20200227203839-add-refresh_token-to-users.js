module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'refresh_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'refresh_token');
  },
};
