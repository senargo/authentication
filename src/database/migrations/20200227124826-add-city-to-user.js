module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'city');
  },
};
