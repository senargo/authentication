"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _UserGroup = require('../models/UserGroup'); var _UserGroup2 = _interopRequireDefault(_UserGroup);

class GroupController {
  async index(req, res) {
    const userId = req.params.id;
    if (userId) {
      const groups = await _Group2.default.findAll({
        attributes: [
          'id',
          'name',
          'desc',
          'is_admin',
          'createdAt',
          'updatedAt',
        ],
        include: [
          {
            model: _User2.default,
            as: 'users',
            attributes: ['id', 'name', 'email'],
            where: { id: userId },
            through: {
              // This block of code allows you to retrieve the properties of the join table

              model: _UserGroup2.default,
              as: 'usergroup',
            },
          },
        ],
        order: ['name'],
      });

      const arrGroups = [];

      groups.map(group => {
        return arrGroups.push(group.name);
      });

      return res.json(arrGroups);
    }

    const groups = await _Group2.default.findAll();

    return res.json(groups);
  }

  async store(req, res) {
    const groupExists = await _Group2.default.findOne({
      where: { name: req.body.name },
    });

    if (groupExists) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    const { id, name, desc, is_admin } = await _Group2.default.create(req.body);

    return res.json({ id, name, desc, is_admin });
  }
}

exports. default = new GroupController();
