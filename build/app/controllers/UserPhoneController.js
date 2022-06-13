"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _UserPhone = require('../models/UserPhone'); var _UserPhone2 = _interopRequireDefault(_UserPhone);

class UserPhoneController {
  async index(req, res) {
    const userId = req.params.userid;
    if (userId) {
      const phones = await _UserPhone2.default.findAll({
        where: { user_id: userId },
        attributes: ['id', 'phone', 'phone_type'],
        order: ['phone_type'],
      });

      return res.json(phones);
    }

    const phones = await _UserPhone2.default.findAll({
      attributes: ['id', 'user_id', 'phone', 'phone_type'],
      order: ['phone_type'],
    });

    return res.json(phones);
  }

  async store(req, res) {
    const { id, user_id, phone, phone_type } = await _UserPhone2.default.create(req.body);

    return res.json({ id, user_id, phone, phone_type });
  }

  async update(req, res) {
    const user_phone = await _UserPhone2.default.findByPk(req.body.id);

    const { id, phone, phone_type } = await user_phone.update(req.body);

    return res.json({
      id,
      phone,
      phone_type,
    });
  }
}

exports. default = new UserPhoneController();
