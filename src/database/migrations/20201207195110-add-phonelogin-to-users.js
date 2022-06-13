module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'phone_login', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'phone_login');
  },
};
