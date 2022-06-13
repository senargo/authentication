import ResourcesRoles from '../models/ResourcesRoles';
import Resource from '../models/Resource';
import Role from '../models/Role';

class ResourcesRolesController {
  async index(req, res) {
    const req_url = req.originalUrl;
    const { id } = req.params;

    if (req_url.includes('resourcesroles/resource')) {
      const resources_roles = await ResourcesRoles.findAll({
        where: { resource_id: id },
        attributes: ['id', 'resource_id', 'role_id'],
        order: ['role_id'],
      });

      return res.json(resources_roles);
    }

    if (req_url.includes('resourcesroles/role')) {
      const resources_roles = await ResourcesRoles.findAll({
        where: { role_id: id },
        attributes: ['id', 'resource_id', 'role_id'],
        order: ['role_id'],
      });

      return res.json(resources_roles);
    }

    const resources_roles = await ResourcesRoles.findAll({
      attributes: ['id', 'resource_id', 'role_id'],
      order: ['resource_id'],
    });

    return res.json(resources_roles);
  }

  async store(req, res) {
    const bondExists = await ResourcesRoles.findOne({
      where: { resource_id: req.body.resource_id, role_id: req.body.role_id },
    });

    if (bondExists) {
      return res
        .status(400)
        .json({ error: 'Resource/Role bond already exists' });
    }

    const resourceExists = await Resource.findOne({
      where: { id: req.body.resource_id },
    });

    if (!resourceExists) {
      return res.status(400).json({ error: 'Resource does not exists' });
    }

    const roleExists = await Role.findOne({
      where: { id: req.body.role_id },
    });

    if (!roleExists) {
      return res.status(400).json({ error: 'Role does not exists' });
    }

    const { id, resource_id, role_id } = await ResourcesRoles.create(req.body);

    return res.json({
      id,
      resource_id,
      role_id,
    });
  }

  async update(req, res) {
    const bondExists = await ResourcesRoles.findOne({
      where: { resource_id: req.body.resource_id, role_id: req.body.role_id },
    });

    if (bondExists) {
      return res
        .status(400)
        .json({ error: 'Resource/Role bond already exists' });
    }

    const resourceExists = await Resource.findOne({
      where: { id: req.body.resource_id },
    });

    if (!resourceExists) {
      return res.status(400).json({ error: 'Resource does not exists' });
    }

    const roleExists = await Role.findOne({
      where: { id: req.body.role_id },
    });

    if (!roleExists) {
      return res.status(400).json({ error: 'Role does not exists' });
    }

    const resources_roles = await ResourcesRoles.findByPk(req.body.id);

    const { id, resource_id, role_id } = await resources_roles.update(req.body);

    return res.json({
      id,
      resource_id,
      role_id,
    });
  }

  async delete(req, res) {
    const resource_role_bond = await ResourcesRoles.findOne({
      where: { id: req.body.id },
    });

    if (!resource_role_bond) {
      return res
        .status(404)
        .json({ error: 'Resource/Role bond does not exist' });
    }

    await resource_role_bond.destroy({
      where: { id: req.body.id },
    });

    return res.json({ msg: 'Resource/Role bond deleted' });
  }
}

export default new ResourcesRolesController();
