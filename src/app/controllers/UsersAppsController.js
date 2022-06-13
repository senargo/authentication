import UsersApps from '../models/UsersApps';
import User from '../models/User';
import App from '../models/Application';

class UsersAppsController {
  async index(req, res) {
    const req_url = req.originalUrl;
    const { id } = req.params;

    if (req_url.includes('usersapps/user')) {
      const users_apps = await UsersApps.findAll({
        where: { user_id: id },
        attributes: ['id', 'user_id', 'app_id'],
        order: ['app_id'],
      });

      return res.json(users_apps);
    }

    if (req_url.includes('usersapps/app')) {
      const users_apps = await UsersApps.findAll({
        where: { app_id: id },
        attributes: ['id', 'user_id', 'app_id'],
        order: ['app_id'],
      });

      return res.json(users_apps);
    }

    const users_apps = await UsersApps.findAll({
      attributes: ['id', 'user_id', 'app_id'],
      order: ['app_id'],
    });

    return res.json(users_apps);
  }

  async store(req, res) {
    const bondExists = await UsersApps.findOne({
      where: { user_id: req.body.user_id, app_id: req.body.app_id },
    });

    if (bondExists) {
      return res.status(400).json({ error: 'User/App bond already exists' });
    }

    const userExists = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const appExists = await App.findOne({
      where: { id: req.body.app_id },
    });

    if (!appExists) {
      return res.status(400).json({ error: 'App does not exists' });
    }

    const { id, user_id, app_id } = await UsersApps.create(req.body);

    return res.json({
      id,
      user_id,
      app_id,
    });
  }

  async update(req, res) {
    const bondExists = await UsersApps.findOne({
      where: { user_id: req.body.user_id, app_id: req.body.app_id },
    });

    if (bondExists) {
      return res.status(400).json({ error: 'User/App bond already exists' });
    }

    const userExists = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const appExists = await App.findOne({
      where: { id: req.body.app_id },
    });

    if (!appExists) {
      return res.status(400).json({ error: 'App does not exists' });
    }

    const users_apps = await UsersApps.findByPk(req.body.id);

    const { id, user_id, app_id } = await users_apps.update(req.body);

    return res.json({
      id,
      user_id,
      app_id,
    });
  }

  async delete(req, res) {
    const users_apps_bond = await UsersApps.findOne({
      where: { id: req.body.id },
    });

    if (!users_apps_bond) {
      return res.status(404).json({ error: 'User/App bond does not exist' });
    }

    await users_apps_bond.destroy({
      where: { id: req.body.id },
    });

    return res.json({ msg: 'User/App bond deleted' });
  }
}

export default new UsersAppsController();
