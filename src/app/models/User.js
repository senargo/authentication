import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        phone1: Sequelize.STRING,
        phone2: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        visible: Sequelize.BOOLEAN,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        refresh_token: Sequelize.STRING,
        phone_login: Sequelize.STRING,
        phone_code: Sequelize.STRING,
        email_code: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avathar_id', as: 'avathar' });
    this.belongsToMany(models.Group, {
      through: 'UserGroup',
      as: 'groups',
      foreignKey: 'user_id',
      otherKey: 'group_id',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
