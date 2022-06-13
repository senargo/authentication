import UserPhone from '../models/UserPhone';

class UserPhoneController {
  async index(req, res) {
    const userId = req.params.userid;
    if (userId) {
      const phones = await UserPhone.findAll({
        where: { user_id: userId },
        attributes: ['id', 'phone', 'phone_type'],
        order: ['phone_type'],
      });

      return res.json(phones);
    }

    const phones = await UserPhone.findAll({
      attributes: ['id', 'user_id', 'phone', 'phone_type'],
      order: ['phone_type'],
    });

    return res.json(phones);
  }

  async store(req, res) {
    const { id, user_id, phone, phone_type } = await UserPhone.create(req.body);

    return res.json({ id, user_id, phone, phone_type });
  }

  async update(req, res) {
    const user_phone = await UserPhone.findByPk(req.body.id);

    const { id, phone, phone_type } = await user_phone.update(req.body);

    return res.json({
      id,
      phone,
      phone_type,
    });
  }
}

export default new UserPhoneController();
