import Sequelize, { Model } from 'sequelize';

class UsersApps extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        app_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'App',
            key: 'id',
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default UsersApps;
