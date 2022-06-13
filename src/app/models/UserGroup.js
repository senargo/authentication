import Sequelize, { Model } from 'sequelize';

class UserGroup extends Model {
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
        group_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Group',
            key: 'id',
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default UserGroup;
