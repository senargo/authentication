module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'email_code', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'email_code');
  },
};
