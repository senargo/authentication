import Sequelize from 'sequelize';
import Application from '../app/models/Application';
import Resource from '../app/models/Resource';
import Role from '../app/models/Role';
import ResourcesRoles from '../app/models/ResourcesRoles';
import User from '../app/models/User';
import UserPhone from '../app/models/UserPhone';
import UserAddress from '../app/models/UserAddress';
import UsersApps from '../app/models/UsersApps';
import Group from '../app/models/Group';
import UserGroup from '../app/models/UserGroup';
import File from '../app/models/File';
import databaseConfig from '../config/database';

const models = [
  Application,
  Resource,
  Role,
  ResourcesRoles,
  User,
  UserPhone,
  UserAddress,
  UsersApps,
  Group,
  UserGroup,
  File,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
