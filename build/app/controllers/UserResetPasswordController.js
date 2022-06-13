"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class UserResetPasswordController {
  async update(req, res) {
    const { email } = req.body;

    const user = await _User2.default.findOne({
      where: { email, status: true },
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const password = _crypto2.default.randomBytes(6).toString('hex');

    await _Mail2.default.sendMail({
      to: `${user.name} <${email}>`,
      subject: 'Reset de senha',
      html: `
      <!DOCTYPE html>
      <html>

      <head>
          <title>Reset de senha</title>
      </head>

      <body>  
        <div>
          <h3>Olá ${user.name},</h3>
          <p>Acesse o link abaixo para alterar sua senha. </p>
          <a href="https://leitebem.web.app/alterar-senha?email=${email}&hash=${password}">Alterar Senha</a>
        </div>
      </body>
      </html>
      `,
    });

    await user.update({ password });

    return res.status(200).json({ ok: 'Ok. Check your e-mail' });
    // return res.status(200).json({ ok: user });
  }
}

exports. default = new UserResetPasswordController();
