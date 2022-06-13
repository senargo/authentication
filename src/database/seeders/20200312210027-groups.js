module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groups', [
      {
        name: 'Administradores',
        desc: 'Administradores do Sistema',
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        name: 'grupoTI',
        desc: 'TI do Senar',
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        name: 'Mobilizadores',
        desc: 'Mobilizadores do Senar',
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        name: 'Instrutores',
        desc: 'Instrutores do Senar',
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {});
  },
};
