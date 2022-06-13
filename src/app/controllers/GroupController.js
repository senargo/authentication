import Group from '../models/Group';
import User from '../models/User';
import UserGroup from '../models/UserGroup';

class GroupController {
  async index(req, res) {
    const userId = req.params.id;
    if (userId) {
      const groups = await Group.findAll({
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
            model: User,
            as: 'users',
            attributes: ['id', 'name', 'email'],
            where: { id: userId },
            through: {
              // This block of code allows you to retrieve the properties of the join table

              model: UserGroup,
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

    const groups = await Group.findAll();

    return res.json(groups);
  }

  async store(req, res) {
    const groupExists = await Group.findOne({
      where: { name: req.body.name },
    });

    if (groupExists) {
      return res.status(400).json({ error: 'Group already exists' });
    }

    const { id, name, desc, is_admin } = await Group.create(req.body);

    return res.json({ id, name, desc, is_admin });
  }
}

export default new GroupController();
