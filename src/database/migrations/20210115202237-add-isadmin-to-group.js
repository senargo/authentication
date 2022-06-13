module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('groups', 'is_admin', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('groups', 'is_admin');
  },
};
