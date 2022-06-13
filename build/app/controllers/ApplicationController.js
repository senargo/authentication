"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Application = require('../models/Application'); var _Application2 = _interopRequireDefault(_Application);
var _Resource = require('../models/Resource'); var _Resource2 = _interopRequireDefault(_Resource);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);

class ApplicationController {
  async index(req, res) {
    const appId = req.params.id;
    if (appId) {
      const applications = await _Application2.default.findAll({
        where: { id: appId },
        attributes: ['id', 'name'],
        order: ['name'],
      });

      return res.json(applications);
    }
    const applications = await _Application2.default.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });

    return res.json(applications);
  }

  async store(req, res) {
    const applicationExists = await _Application2.default.findOne({
      where: { name: req.body.name },
    });

    if (applicationExists) {
      return res.status(400).json({ error: 'Application already exists' });
    }

    const { id, name } = await _Application2.default.create(req.body);

    return res.json({ id, name });
  }

  async update(req, res) {
    const application = await _Application2.default.findOne({
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
    const roleBondExists = await _Role2.default.findOne({
      where: { application_id: req.body.id },
    });

    if (roleBondExists) {
      return res.status(400).json({ error: 'There is a bond with role table' });
    }

    const resourceBondExists = await _Resource2.default.findOne({
      where: { application_id: req.body.id },
    });

    if (resourceBondExists) {
      return res
        .status(400)
        .json({ error: 'There is a bond with resource table' });
    }

    const application = await _Application2.default.findOne({
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

exports. default = new ApplicationController();
