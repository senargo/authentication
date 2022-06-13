module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_addresses', [
      {
        user_id: 9,
        address: 'Rua T27',
        address_type: 'Residencial',
        address_city: 'Goiânia',
        address_state: 'Goiás',
        address_cep: '74210030',
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 9,
        address: 'Rua 87',
        address_type: 'Comercial',
        address_city: 'Goiânia',
        address_state: 'Goiás',
        address_cep: '74000000',
        created_at: '2020-03-12 14:43:30.000+00',
        updated_at: '2020-03-12 14:43:30.000+00',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_addresses', null, {});
  },
};
