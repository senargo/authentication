"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');

var _express = require('express');
var _expressbrute = require('express-brute'); var _expressbrute2 = _interopRequireDefault(_expressbrute);
var _redis = require('redis'); var _redis2 = _interopRequireDefault(_redis);
var _url = require('url'); var _url2 = _interopRequireDefault(_url);
var _expressbruteredis = require('express-brute-redis'); var _expressbruteredis2 = _interopRequireDefault(_expressbruteredis);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _ApplicationController = require('./app/controllers/ApplicationController'); var _ApplicationController2 = _interopRequireDefault(_ApplicationController);
var _ResourceController = require('./app/controllers/ResourceController'); var _ResourceController2 = _interopRequireDefault(_ResourceController);
var _RoleController = require('./app/controllers/RoleController'); var _RoleController2 = _interopRequireDefault(_RoleController);
var _ResourcesRolesController = require('./app/controllers/ResourcesRolesController'); var _ResourcesRolesController2 = _interopRequireDefault(_ResourcesRolesController);
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _UserPhoneController = require('./app/controllers/UserPhoneController'); var _UserPhoneController2 = _interopRequireDefault(_UserPhoneController);
var _UserAddressController = require('./app/controllers/UserAddressController'); var _UserAddressController2 = _interopRequireDefault(_UserAddressController);
var _UserResetPasswordController = require('./app/controllers/UserResetPasswordController'); var _UserResetPasswordController2 = _interopRequireDefault(_UserResetPasswordController);
var _UsersAppsController = require('./app/controllers/UsersAppsController'); var _UsersAppsController2 = _interopRequireDefault(_UsersAppsController);
var _ImportUserController = require('./app/controllers/ImportUserController'); var _ImportUserController2 = _interopRequireDefault(_ImportUserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _SessionRefreshController = require('./app/controllers/SessionRefreshController'); var _SessionRefreshController2 = _interopRequireDefault(_SessionRefreshController);
var _GroupController = require('./app/controllers/GroupController'); var _GroupController2 = _interopRequireDefault(_GroupController);
var _UserGroupController = require('./app/controllers/UserGroupController'); var _UserGroupController2 = _interopRequireDefault(_UserGroupController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

var _UserStore = require('./app/validators/UserStore'); var _UserStore2 = _interopRequireDefault(_UserStore);
var _UserUpdate = require('./app/validators/UserUpdate'); var _UserUpdate2 = _interopRequireDefault(_UserUpdate);
var _SessionStore = require('./app/validators/SessionStore'); var _SessionStore2 = _interopRequireDefault(_SessionStore);
var _UserAdmin = require('./app/validators/UserAdmin'); var _UserAdmin2 = _interopRequireDefault(_UserAdmin);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

const redisURL = _url2.default.parse(process.env.REDIS_URL);

const redisClient = _redis2.default.createClient(redisURL.port, redisURL.hostname, {
  no_ready_check: true,
});

redisClient.auth(redisURL.auth.split(':')[1]);

const bruteStore = new (0, _expressbruteredis2.default)({
  client: redisClient,
});

const bruteForce = new (0, _expressbrute2.default)(bruteStore);

routes.get('/', bruteForce.prevent, (req, res) => {
  res.send('Online!');
});

routes.post('/sessions', _SessionStore2.default, _SessionController2.default.store);

// routes.post(
//  '/sessions',
//  bruteForce.prevent,
//  validateSessionStore,
//  SessionController.store
// );

routes.post('/sessions/refresh', _SessionRefreshController2.default.store);
routes.post('/sessions/refreshphone', _SessionRefreshController2.default.store);

routes.put('/users/reset-password', _UserResetPasswordController2.default.update);

routes.post('/userspublic', _UserStore2.default, _UserController2.default.store);
routes.get('/validar-cadastro/:email_code', _UserController2.default.update);

routes.post('/usersphone', _UserController2.default.store);
routes.put('/usersphone', _UserController2.default.update);

routes.use(_auth2.default);

routes.get('/users/phones', _UserPhoneController2.default.index);
routes.get('/users/:userid/phones', _UserPhoneController2.default.index);
routes.post('/users/phones', _UserPhoneController2.default.store);
routes.put('/users/phones', _UserPhoneController2.default.update);

routes.get('/users/addresses', _UserAddressController2.default.index);
routes.get('/users/:userid/addresses/', _UserAddressController2.default.index);
routes.post('/users/addresses', _UserAddressController2.default.store);
routes.put('/users/addresses', _UserAddressController2.default.update);

routes.get('/apps', _ApplicationController2.default.index);
routes.get('/apps/:id', _ApplicationController2.default.index);
routes.post('/apps', _UserAdmin2.default, _ApplicationController2.default.store);
routes.put('/apps', _UserAdmin2.default, _ApplicationController2.default.update);
routes.delete('/apps', _UserAdmin2.default, _ApplicationController2.default.delete);

routes.get('/resources', _ResourceController2.default.index);
routes.get('/resources/:id', _ResourceController2.default.index);
routes.post('/resources', _UserAdmin2.default, _ResourceController2.default.store);
routes.put('/resources', _UserAdmin2.default, _ResourceController2.default.update);
routes.delete('/resources', _UserAdmin2.default, _ResourceController2.default.delete);

routes.get('/roles', _RoleController2.default.index);
routes.get('/roles/:id', _RoleController2.default.index);
routes.post('/roles', _UserAdmin2.default, _RoleController2.default.store);
routes.put('/roles', _UserAdmin2.default, _RoleController2.default.update);
routes.delete('/roles', _UserAdmin2.default, _RoleController2.default.delete);

routes.get('/resourcesroles', _ResourcesRolesController2.default.index);
routes.get('/resourcesroles/resource/:id', _ResourcesRolesController2.default.index);
routes.get('/resourcesroles/role/:id', _ResourcesRolesController2.default.index);
routes.post(
  '/resourcesroles',
  _UserAdmin2.default,
  _ResourcesRolesController2.default.store
);
routes.put(
  '/resourcesroles',
  _UserAdmin2.default,
  _ResourcesRolesController2.default.update
);
routes.delete(
  '/resourcesroles',
  _UserAdmin2.default,
  _ResourcesRolesController2.default.delete
);

routes.get('/usersapps', _UsersAppsController2.default.index);
routes.get('/usersapps/user/:id', _UsersAppsController2.default.index);
routes.get('/usersapps/app/:id', _UsersAppsController2.default.index);
routes.post('/usersapps', _UsersAppsController2.default.store);
routes.put('/usersapps', _UserAdmin2.default, _UsersAppsController2.default.update);
routes.delete('/usersapps', _UserAdmin2.default, _UsersAppsController2.default.delete);

routes.get('/users', _UserAdmin2.default, _UserController2.default.index);
routes.get('/users/:id', _UserController2.default.index);
routes.get('/users/group/:id', _UserController2.default.index);
routes.post(
  '/users',
  _UserStore2.default,
  _UserAdmin2.default,
  _UserController2.default.store
);
routes.put('/users', _UserUpdate2.default, _UserController2.default.update);
routes.post(
  '/users/import/:fileid',
  _UserAdmin2.default,
  _ImportUserController2.default.store
);

routes.get('/groups', _GroupController2.default.index);
routes.get('/groups/user/:id', _GroupController2.default.index);
routes.post('/groups', _UserAdmin2.default, _GroupController2.default.store);

routes.post('/usersgroups', _UserGroupController2.default.store);

routes.post('/files', upload.single('file'), _FileController2.default.store);

exports. default = routes;
