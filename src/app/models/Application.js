import Sequelize, { Model } from 'sequelize';

class Application extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Application;
