"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
        phone1: _sequelize2.default.STRING,
        phone2: _sequelize2.default.STRING,
        status: _sequelize2.default.BOOLEAN,
        visible: _sequelize2.default.BOOLEAN,
        city: _sequelize2.default.STRING,
        state: _sequelize2.default.STRING,
        refresh_token: _sequelize2.default.STRING,
        phone_login: _sequelize2.default.STRING,
        phone_code: _sequelize2.default.STRING,
        email_code: _sequelize2.default.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
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
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = User;
