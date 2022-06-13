"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_groups', [
      {
        user_id: 1,
        group_id: 3,
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 2,
        group_id: 3,
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 3,
        group_id: 3,
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 4,
        group_id: 3,
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 5,
        group_id: 3,
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
      {
        user_id: 6,
        group_id: 3,
        created_at: '2020-03-12 14:43:29.754+00',
        updated_at: '2020-03-12 14:43:29.754+00',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_groups', null, {});
  },
};
