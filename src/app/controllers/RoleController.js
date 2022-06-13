import Role from '../models/Role';
import Application from '../models/Application';

class ResourceController {
  async index(req, res) {
    const roleId = req.params.id;
    if (roleId) {
      const roles = await Role.findAll({
        where: { id: roleId },
        attributes: ['id', 'application_id', 'name'],
        order: ['name'],
      });

      return res.json(roles);
    }
    const roles = await Role.findAll({
      attributes: ['id', 'application_id', 'name'],
      order: ['name'],
    });

    return res.json(roles);
  }

  async store(req, res) {
    const rolesExists = await Role.findOne({
      where: { name: req.body.name, application_id: req.body.application_id },
    });

    if (rolesExists) {
      return res.status(400).json({ error: 'Role already exists' });
    }

    const applicationExists = await Application.findOne({
      where: { id: req.body.application_id },
    });

    if (!applicationExists) {
      return res.status(400).json({ error: 'Application does not exists' });
    }

    const { id, name, application_id } = await Role.create(req.body);

    return res.json({ id, name, application_id });
  }

  async update(req, res) {
    const role = await Role.findOne({
      where: { id: req.body.id },
    });

    if (!role) {
      return res.status(404).json({ error: 'Role does not exist' });
    }

    const applicationExists = await Application.findOne({
      where: { id: req.body.application_id },
    });

    if (!applicationExists) {
      return res.status(400).json({ error: 'Application does not exists' });
    }

    const { id, application_id, name } = await role.update(req.body);

    return res.json({
      id,
      application_id,
      name,
    });
  }

  async delete(req, res) {
    const role = await Role.findOne({
      where: { id: req.body.id },
    });

    if (!role) {
      return res.status(404).json({ error: 'Role does not exist' });
    }

    await role.destroy({
      where: { id: req.body.id },
    });

    return res.json({ msg: 'Role deleted' });
  }
}

export default new ResourceController();
