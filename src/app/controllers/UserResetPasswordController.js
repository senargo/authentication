import crypto from 'crypto';
import User from '../models/User';
import Mail from '../../lib/Mail';

class UserResetPasswordController {
  async update(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email, status: true },
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const password = crypto.randomBytes(6).toString('hex');

    await Mail.sendMail({
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

export default new UserResetPasswordController();
