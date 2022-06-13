"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _Application = require('../app/models/Application'); var _Application2 = _interopRequireDefault(_Application);
var _Resource = require('../app/models/Resource'); var _Resource2 = _interopRequireDefault(_Resource);
var _Role = require('../app/models/Role'); var _Role2 = _interopRequireDefault(_Role);
var _ResourcesRoles = require('../app/models/ResourcesRoles'); var _ResourcesRoles2 = _interopRequireDefault(_ResourcesRoles);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _UserPhone = require('../app/models/UserPhone'); var _UserPhone2 = _interopRequireDefault(_UserPhone);
var _UserAddress = require('../app/models/UserAddress'); var _UserAddress2 = _interopRequireDefault(_UserAddress);
var _UsersApps = require('../app/models/UsersApps'); var _UsersApps2 = _interopRequireDefault(_UsersApps);
var _Group = require('../app/models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _UserGroup = require('../app/models/UserGroup'); var _UserGroup2 = _interopRequireDefault(_UserGroup);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [
  _Application2.default,
  _Resource2.default,
  _Role2.default,
  _ResourcesRoles2.default,
  _User2.default,
  _UserPhone2.default,
  _UserAddress2.default,
  _UsersApps2.default,
  _Group2.default,
  _UserGroup2.default,
  _File2.default,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

exports. default = new Database();
