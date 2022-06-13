import Sequelize, { Model } from 'sequelize';

class UserAddress extends Model {
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
        address: Sequelize.STRING,
        address_type: Sequelize.STRING,
        address_city: Sequelize.STRING,
        address_state: Sequelize.STRING,
        address_cep: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default UserAddress;
