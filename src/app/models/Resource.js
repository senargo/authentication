import Sequelize, { Model } from 'sequelize';

class Resource extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Application, {
      foreignKey: 'application_id',
      as: 'application',
    });
  }
}

export default Resource;
