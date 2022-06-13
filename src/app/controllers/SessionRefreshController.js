import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionRefreshController {
  async store(req, res) {
    let user;

    if (req.body.email) {
      const { email, refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token sent' });
      }

      user = await User.findOne({
        where: { email, refresh_token, status: true },
      });
    }

    if (req.body.phone_login) {
      const { phone_login, refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token sent' });
      }

      user = await User.findOne({
        where: { phone_login, refresh_token, status: true },
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { id, name, email, phone1, phone2, visible, city } = user;

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

export default new SessionRefreshController();
