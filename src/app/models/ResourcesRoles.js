import Sequelize, { Model } from 'sequelize';

class ResourcesRoles extends Model {
  static init(sequelize) {
    super.init(
      {
        resource_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Resource',
            key: 'id',
          },
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Role',
            key: 'id',
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default ResourcesRoles;
