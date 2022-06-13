"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_phones', [
      {
        user_id: 9,
        phone: '(62)98406-4452',
        phone_type: 'Celular',
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 9,
        phone: '(62)3092-2621',
        phone_type: 'Fixo',
        created_at: '2020-03-12 14:43:30.000+00',
        updated_at: '2020-03-12 14:43:30.000+00',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_phones', null, {});
  },
};
