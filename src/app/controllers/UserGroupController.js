import UserGroup from '../models/UserGroup';
import User from '../models/User';
import Group from '../models/Group';

class UserGroupController {
  async store(req, res) {
    const groupExists = await Group.findOne({
      where: { id: req.body.group_id },
    });

    if (!groupExists) {
      return res.status(400).json({ error: 'Group does not exist' });
    }

    const userExists = await User.findOne({
      where: { id: req.body.user_id },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    try {
      const { id, group_id, user_id } = await UserGroup.create(req.body);
      return res.json({ id, group_id, user_id });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

export default new UserGroupController();
