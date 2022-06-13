import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, phone1, phone2, visible, city } = user;

    const accessToken = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const accessTokenRefresh = jwt.sign({ id }, authConfig.secretRefresh);

    await user.update({ refresh_token: accessTokenRefresh });

    return res.json({
      user: {
        id,
        name,
        email,
        phone1,
        phone2,
        visible,
        city,
      },
      token: accessToken,
      refresh_token: accessTokenRefresh,
    });
  }
}

export default new SessionController();
