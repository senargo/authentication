"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _UserAddress = require('../models/UserAddress'); var _UserAddress2 = _interopRequireDefault(_UserAddress);

class UserAddressController {
  async index(req, res) {
    const { userid } = req.params;
    if (userid) {
      const address = await _UserAddress2.default.findAll({
        where: { user_id: userid },
        attributes: [
          'id',
          'address',
          'address_type',
          'address_city',
          'address_state',
          'address_cep',
        ],
        order: ['address_type'],
      });

      return res.json(address);
    }

    const address = await _UserAddress2.default.findAll({
      attributes: [
        'id',
        'user_id',
        'address',
        'address_type',
        'address_city',
        'address_state',
        'address_cep',
      ],
      order: ['address_type'],
    });

    return res.json(address);
  }

  async store(req, res) {
    const {
      id,
      user_id,
      address,
      address_type,
      address_city,
      address_state,
      address_cep,
    } = await _UserAddress2.default.create(req.body);

    return res.json({
      id,
      user_id,
      address,
      address_type,
      address_city,
      address_state,
      address_cep,
    });
  }

  async update(req, res) {
    const user_address = await _UserAddress2.default.findByPk(req.body.id);

    const {
      id,
      user_id,
      address,
      address_type,
      address_city,
      address_state,
      address_cep,
    } = await user_address.update(req.body);

    return res.json({
      id,
      user_id,
      address,
      address_type,
      address_city,
      address_state,
      address_cep,
    });
  }
}

exports. default = new UserAddressController();
