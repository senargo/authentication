import Resource from '../models/Resource';
import Application from '../models/Application';

class ResourceController {
  async index(req, res) {
    const resourceId = req.params.id;
    if (resourceId) {
      const resources = await Resource.findAll({
        where: { id: resourceId },
        attributes: ['id', 'application_id', 'name'],
        order: ['name'],
      });

      return res.json(resources);
    }
    const resources = await Resource.findAll({
      attributes: ['id', 'application_id', 'name'],
      order: ['name'],
    });

    return res.json(resources);
  }

  async store(req, res) {
    const resourceExists = await Resource.findOne({
      where: { name: req.body.name, application_id: req.body.application_id },
    });

    if (resourceExists) {
      return res.status(400).json({ error: 'Resource already exists' });
    }

    const applicationExists = await Application.findOne({
      where: { id: req.body.application_id },
    });

    if (!applicationExists) {
      return res.status(400).json({ error: 'Application does not exists' });
    }

    const { id, name, application_id } = await Resource.create(req.body);

    return res.json({ id, name, application_id });
  }

  async update(req, res) {
    const resource = await Resource.findOne({
      where: { id: req.body.id },
    });

    if (!resource) {
      return res.status(404).json({ error: 'Resource does not exist' });
    }

    const applicationExists = await Application.findOne({
      where: { id: req.body.application_id },
    });

    if (!applicationExists) {
      return res.status(400).json({ error: 'Application does not exists' });
    }

    const { id, application_id, name } = await resource.update(req.body);

    return res.json({
      id,
      application_id,
      name,
    });
  }

  async delete(req, res) {
    const resource = await Resource.findOne({
      where: { id: req.body.id },
    });

    if (!resource) {
      return res.status(404).json({ error: 'Resource does not exist' });
    }

    await resource.destroy({
      where: { id: req.body.id },
    });

    return res.json({ msg: 'Resource deleted' });
  }
}

export default new ResourceController();
