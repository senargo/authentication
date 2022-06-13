"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class UsersApps extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id',
          },
        },
        app_id: {
          type: _sequelize2.default.INTEGER,
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

exports. default = UsersApps;
