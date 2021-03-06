"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class UserAddress extends _sequelize.Model {
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
        address: _sequelize2.default.STRING,
        address_type: _sequelize2.default.STRING,
        address_city: _sequelize2.default.STRING,
        address_state: _sequelize2.default.STRING,
        address_cep: _sequelize2.default.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

exports. default = UserAddress;
