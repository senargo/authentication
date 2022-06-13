"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _ResourcesRoles = require('../models/ResourcesRoles'); var _ResourcesRoles2 = _interopRequireDefault(_ResourcesRoles);
var _Resource = require('../models/Resource'); var _Resource2 = _interopRequireDefault(_Resource);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);

class ResourcesRolesController {
  async index(req, res) {
    const req_url = req.originalUrl;
    const { id } = req.params;

    if (req_url.includes('resourcesroles/resource')) {
      const resources_roles = await _ResourcesRoles2.default.findAll({
        where: { resource_id: id },
        attributes: ['id', 'resource_id', 'role_id'],
        order: ['role_id'],
      });

      return res.json(resources_roles);
    }

    if (req_url.includes('resourcesroles/role')) {
      const resources_roles = await _ResourcesRoles2.default.findAll({
        where: { role_id: id },
        attributes: ['id', 'resource_id', 'role_id'],
        order: ['role_id'],
      });

      return res.json(resources_roles);
    }

    const resources_roles = await _ResourcesRoles2.default.findAll({
      attributes: ['id', 'resource_id', 'role_id'],
      order: ['resource_id'],
    });

    return res.json(resources_roles);
  }

  async store(req, res) {
    const bondExists = await _ResourcesRoles2.default.findOne({
      where: { resource_id: req.body.resource_id, role_id: req.body.role_id },
    });

    if (bondExists) {
      return res
        .status(400)
        .json({ error: 'Resource/Role bond already exists' });
    }

    const resourceExists = await _Resource2.default.findOne({
      where: { id: req.body.resource_id },
    });

    if (!resourceExists) {
      return res.status(400).json({ error: 'Resource does not exists' });
    }

    const roleExists = await _Role2.default.findOne({
      where: { id: req.body.role_id },
    });

    if (!roleExists) {
      return res.status(400).json({ error: 'Role does not exists' });
    }

    const { id, resource_id, role_id } = await _ResourcesRoles2.default.create(req.body);

    return res.json({
      id,
      resource_id,
      role_id,
    });
  }

  async update(req, res) {
    const bondExists = await _ResourcesRoles2.default.findOne({
      where: { resource_id: req.body.resource_id, role_id: req.body.role_id },
    });

    if (bondExists) {
      return res
        .status(400)
        .json({ error: 'Resource/Role bond already exists' });
    }

    const resourceExists = await _Resource2.default.findOne({
      where: { id: req.body.resource_id },
    });

    if (!resourceExists) {
      return res.status(400).json({ error: 'Resource does not exists' });
    }

    const roleExists = await _Role2.default.findOne({
      where: { id: req.body.role_id },
    });

    if (!roleExists) {
      return res.status(400).json({ error: 'Role does not exists' });
    }

    const resources_roles = await _ResourcesRoles2.default.findByPk(req.body.id);

    const { id, resource_id, role_id } = await resources_roles.update(req.body);

    return res.json({
      id,
      resource_id,
      role_id,
    });
  }

  async delete(req, res) {
    const resource_role_bond = await _ResourcesRoles2.default.findOne({
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

exports. default = new ResourcesRolesController();
