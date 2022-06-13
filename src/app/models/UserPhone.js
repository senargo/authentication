import Sequelize, { Model } from 'sequelize';

class UserPhone extends Model {
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
        phone: Sequelize.STRING,
        phone_type: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default UserPhone;
