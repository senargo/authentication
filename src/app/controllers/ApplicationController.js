import Application from '../models/Application';
import Resource from '../models/Resource';
import Role from '../models/Role';

class ApplicationController {
  async index(req, res) {
    const appId = req.params.id;
    if (appId) {
      const applications = await Application.findAll({
        where: { id: appId },
        attributes: ['id', 'name'],
        order: ['name'],
      });

      return res.json(applications);
    }
    const applications = await Application.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });

    return res.json(applications);
  }

  async store(req, res) {
    const applicationExists = await Application.findOne({
      where: { name: req.body.name },
    });

    if (applicationExists) {
      return res.status(400).json({ error: 'Application already exists' });
    }

    const { id, name } = await Application.create(req.body);

    return res.json({ id, name });
  }

  async update(req, res) {
    const application = await Application.findOne({
      where: { id: req.body.id },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application does not exist' });
    }

    const { id, name } = await application.update(req.body);

    return res.json({
      id,
      name,
    });
  }

  async delete(req, res) {
    const roleBondExists = await Role.findOne({
      where: { application_id: req.body.id },
    });

    if (roleBondExists) {
      return res.status(400).json({ error: 'There is a bond with role table' });
    }

    const resourceBondExists = await Resource.findOne({
      where: { application_id: req.body.id },
    });

    if (resourceBondExists) {
      return res
        .status(400)
        .json({ error: 'There is a bond with resource table' });
    }

    const application = await Application.findOne({
      where: { id: req.body.id },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application does not exist' });
    }

    await application.destroy({
      where: { id: req.body.id },
    });

    return res.json({ msg: 'Application deleted' });
  }
}

export default new ApplicationController();
