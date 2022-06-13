"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _UserGroup = require('../models/UserGroup'); var _UserGroup2 = _interopRequireDefault(_UserGroup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);

class UserGroupController {
  async store(req, res) {
    const groupExists = await _Group2.default.findOne({
      where: { id: req.body.group_id },
    });

    if (!groupExists) {
      return res.status(400).json({ error: 'Group does not exist' });
    }

    const userExists = await _User2.default.findOne({
      where: { id: req.body.user_id },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    try {
      const { id, group_id, user_id } = await _UserGroup2.default.create(req.body);
      return res.json({ id, group_id, user_id });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

exports. default = new UserGroupController();
