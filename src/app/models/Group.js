import Sequelize, { Model } from 'sequelize';

class Group extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        desc: Sequelize.STRING,
        is_admin: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'UserGroup',
      as: 'users',
      foreignKey: 'group_id',
      otherKey: 'user_id',
    });
  }
}

export default Group;
