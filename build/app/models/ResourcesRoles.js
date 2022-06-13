"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ResourcesRoles extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        resource_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          references: {
            model: 'Resource',
            key: 'id',
          },
        },
        role_id: {
          type: _sequelize2.default.INTEGER,
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

exports. default = ResourcesRoles;
