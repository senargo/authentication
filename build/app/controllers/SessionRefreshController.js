"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionRefreshController {
  async store(req, res) {
    let user;

    if (req.body.email) {
      const { email, refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token sent' });
      }

      user = await _User2.default.findOne({
        where: { email, refresh_token, status: true },
      });
    }

    if (req.body.phone_login) {
      const { phone_login, refresh_token } = req.body;

      if (!refresh_token) {
        return res.status(401).json({ error: 'No refresh token sent' });
      }

      user = await _User2.default.findOne({
        where: { phone_login, refresh_token, status: true },
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { id, name, email, phone1, phone2, visible, city } = user;

    const accessToken = _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
      expiresIn: _auth2.default.expiresIn,
    });

    const accessTokenRefresh = _jsonwebtoken2.default.sign({ id }, _auth2.default.secretRefresh);

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

exports. default = new SessionRefreshController();
