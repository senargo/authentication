import 'dotenv/config';

import { Router } from 'express';
import Brute from 'express-brute';
import redis from 'redis';
import url from 'url';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';
import ApplicationController from './app/controllers/ApplicationController';
import ResourceController from './app/controllers/ResourceController';
import RoleController from './app/controllers/RoleController';
import ResourcesRolesController from './app/controllers/ResourcesRolesController';
import UserController from './app/controllers/UserController';
import UserPhoneController from './app/controllers/UserPhoneController';
import UserAddressController from './app/controllers/UserAddressController';
import UserResetPasswordController from './app/controllers/UserResetPasswordController';
import UsersAppsController from './app/controllers/UsersAppsController';
import ImportUserController from './app/controllers/ImportUserController';
import SessionController from './app/controllers/SessionController';
import SessionRefreshController from './app/controllers/SessionRefreshController';
import GroupController from './app/controllers/GroupController';
import UserGroupController from './app/controllers/UserGroupController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateUserAdmin from './app/validators/UserAdmin';

const routes = new Router();
const upload = multer(multerConfig);

const redisURL = url.parse(process.env.REDIS_URL);

const redisClient = redis.createClient(redisURL.port, redisURL.hostname, {
  no_ready_check: true,
});

redisClient.auth(redisURL.auth.split(':')[1]);

const bruteStore = new BruteRedis({
  client: redisClient,
});

const bruteForce = new Brute(bruteStore);

routes.get('/', bruteForce.prevent, (req, res) => {
  res.send('Online!');
});

routes.post('/sessions', validateSessionStore, SessionController.store);

// routes.post(
//  '/sessions',
//  bruteForce.prevent,
//  validateSessionStore,
//  SessionController.store
// );

routes.post('/sessions/refresh', SessionRefreshController.store);
routes.post('/sessions/refreshphone', SessionRefreshController.store);

routes.put('/users/reset-password', UserResetPasswordController.update);

routes.post('/userspublic', validateUserStore, UserController.store);
routes.get('/validar-cadastro/:email_code', UserController.update);

routes.post('/usersphone', UserController.store);
routes.put('/usersphone', UserController.update);

routes.use(authMiddleware);

routes.get('/users/phones', UserPhoneController.index);
routes.get('/users/:userid/phones', UserPhoneController.index);
routes.post('/users/phones', UserPhoneController.store);
routes.put('/users/phones', UserPhoneController.update);

routes.get('/users/addresses', UserAddressController.index);
routes.get('/users/:userid/addresses/', UserAddressController.index);
routes.post('/users/addresses', UserAddressController.store);
routes.put('/users/addresses', UserAddressController.update);

routes.get('/apps', ApplicationController.index);
routes.get('/apps/:id', ApplicationController.index);
routes.post('/apps', validateUserAdmin, ApplicationController.store);
routes.put('/apps', validateUserAdmin, ApplicationController.update);
routes.delete('/apps', validateUserAdmin, ApplicationController.delete);

routes.get('/resources', ResourceController.index);
routes.get('/resources/:id', ResourceController.index);
routes.post('/resources', validateUserAdmin, ResourceController.store);
routes.put('/resources', validateUserAdmin, ResourceController.update);
routes.delete('/resources', validateUserAdmin, ResourceController.delete);

routes.get('/roles', RoleController.index);
routes.get('/roles/:id', RoleController.index);
routes.post('/roles', validateUserAdmin, RoleController.store);
routes.put('/roles', validateUserAdmin, RoleController.update);
routes.delete('/roles', validateUserAdmin, RoleController.delete);

routes.get('/resourcesroles', ResourcesRolesController.index);
routes.get('/resourcesroles/resource/:id', ResourcesRolesController.index);
routes.get('/resourcesroles/role/:id', ResourcesRolesController.index);
routes.post(
  '/resourcesroles',
  validateUserAdmin,
  ResourcesRolesController.store
);
routes.put(
  '/resourcesroles',
  validateUserAdmin,
  ResourcesRolesController.update
);
routes.delete(
  '/resourcesroles',
  validateUserAdmin,
  ResourcesRolesController.delete
);

routes.get('/usersapps', UsersAppsController.index);
routes.get('/usersapps/user/:id', UsersAppsController.index);
routes.get('/usersapps/app/:id', UsersAppsController.index);
routes.post('/usersapps', UsersAppsController.store);
routes.put('/usersapps', validateUserAdmin, UsersAppsController.update);
routes.delete('/usersapps', validateUserAdmin, UsersAppsController.delete);

routes.get('/users', validateUserAdmin, UserController.index);
routes.get('/users/:id', UserController.index);
routes.get('/users/group/:id', UserController.index);
routes.post(
  '/users',
  validateUserStore,
  validateUserAdmin,
  UserController.store
);
routes.put('/users', validateUserUpdate, UserController.update);
routes.post(
  '/users/import/:fileid',
  validateUserAdmin,
  ImportUserController.store
);

routes.get('/groups', GroupController.index);
routes.get('/groups/user/:id', GroupController.index);
routes.post('/groups', validateUserAdmin, GroupController.store);

routes.post('/usersgroups', UserGroupController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
