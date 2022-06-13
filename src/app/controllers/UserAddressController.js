import UserAddress from '../models/UserAddress';

class UserAddressController {
  async index(req, res) {
    const { userid } = req.params;
    if (userid) {
      const address = await UserAddress.findAll({
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

    const address = await UserAddress.findAll({
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
    } = await UserAddress.create(req.body);

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
    const user_address = await UserAddress.findByPk(req.body.id);

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

export default new UserAddressController();
