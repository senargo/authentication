import 'dotenv/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import Group from '../models/Group';
import UserGroup from '../models/UserGroup';
import authConfig from '../../config/auth';
import Mail from '../../lib/Mail';

const axios = require('axios');

function sendEmail(name, email, app, link) {
  Mail.sendMail({
    to: `${name} <${email}>`,
    subject: 'Confirmação de cadastro',
    html: `
    <!DOCTYPE html>
    <html>

    <head>
        <title>Confirmação de cadastro</title>
    </head>

    <body>
        <div>
            <h3>Olá ${name},</h3>
            <p>Para confirmar o seu cadastro no ${app} favor clicar no link
            abaixo.</p>

            <a href="${link}">${link}</a>
            <br /><br />
            <div>
                Tenha um bom dia!
            </div>
        </div>

    </body>

    </html>
    `,
  });
}

class UserController {
  async index(req, res) {
    const requestId = req.params.id;

    // Pesquisando todos os usuários de um determinado grupo
    if (req.route.path === '/users/group/:id') {
      const users = await User.findAll({
        where: { status: true },
        attributes: [
          'id',
          'name',
          'email',
          'phone1',
          'phone2',
          'status',
          'visible',
          'city',
          'state',
        ],
        include: [
          {
            model: Group,
            as: 'groups',
            attributes: ['id', 'name'],
            where: { id: requestId },
            through: {
              // This block of code allows you to retrieve the properties of the join table

              model: UserGroup,
              as: 'usergroup',
            },
          },
        ],
        order: ['name'],
      });

      return res.json(users);
    }

    // Trazendo dados do usuário com um determinado id
    if (req.route.path === '/users/:id') {
      const users = await User.findAll({
        where: { id: requestId, status: true },
        attributes: [
          'id',
          'name',
          'email',
          'phone1',
          'phone2',
          'status',
          'visible',
          'city',
          'state',
        ],
        include: [
          {
            model: Group,
            as: 'groups',
            attributes: ['id', 'name'],
            through: {
              // This block of code allows you to retrieve the properties of the join table

              model: UserGroup,
              as: 'usergroup',
            },
          },
        ],
        order: ['name'],
      });

      return res.json(users);
    }

    // Trazendo todos os usuários
    const users = await User.findAll({
      where: { status: true },
      attributes: [
        'id',
        'name',
        'email',
        'phone1',
        'phone2',
        'status',
        'visible',
        'city',
        'state',
      ],
      include: [
        {
          model: Group,
          as: 'groups',
          required: false,
          attributes: ['id', 'name'],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: UserGroup,
            as: 'usergroup',
          },
        },
      ],
      order: ['name'],
    });

    return res.json(users);
  }

  async store(req, res) {
    // Criação de usuário com cadastro por número de telefone
    if (req.body.phone_login) {
      const userExists = await User.findOne({
        where: { phone_login: req.body.phone_login },
      });

      const randomNumber = await Math.floor(100000 + Math.random() * 900000);
      let smsStatusCode = '';
      let smsDetailDescription = '';

      await axios({
        method: 'post',
        url: 'https://api-rest.zenvia.com/services/send-sms',
        auth: {
          username: 'lucasgomes.corp.api',
          password: 'hH0zB2pNSM',
        },
        data: {
          sendSmsRequest: {
            from: 'Senar/GO',
            to: req.body.phone_login,
            msg: `Código de segurança para o Senar: ${randomNumber}`,
            aggregateId: req.body.phone_login.substring(4, 9),
            flashSms: false,
            dataCoding: 8,
          },
        },
      })
        .then(smsResponse => {
          smsStatusCode = smsResponse.data.sendSmsResponse.statusCode;
          smsDetailDescription =
            smsResponse.data.sendSmsResponse.detailDescription;
        })
        .catch(() => {
          return res.status(500).json({ error: 'SMS error' });
        });

      if (smsStatusCode === '00') {
        if (userExists) {
          const { id, phone_login } = await userExists.update(
            { phone_code: randomNumber },
            { where: { id: userExists.id } }
          );

          return res.json({
            id,
            phone_login,
            smsStatusCode,
            smsDetailDescription,
          });
        }

        const { id, phone_login } = await User.create({
          name: req.body.phone_login,
          email: req.body.phone_login,
          password_hash: req.body.phone_login,
          phone1: null,
          phone2: null,
          status: false,
          visible: false,
          city: null,
          state: null,
          phone_login: req.body.phone_login,
          phone_code: randomNumber,
        });

        return res.json({
          id,
          phone_login,
          smsStatusCode,
          smsDetailDescription,
        });
      }
    }

    // Criação de usuário pública, com envio de email
    const req_url = req.originalUrl;
    if (req_url.includes('userspublic')) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists && userExists.status === true) {
        return res.status(400).json({ error: 'User already exists' });
      }

      if (userExists && userExists.status === false) {
        const app = req.body.app ? req.body.app : 'Senar';
        const url_default = `${process.env.APP_URL}/validar-cadastro/${userExists.email_code}`;
        const url_email = req.body.url_email
          ? req.body.url_email + userExists.email_code
          : url_default;

        await sendEmail(userExists.name, userExists.email, app, url_email);

        return res.json({
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          phone1: userExists.phone1,
          phone2: userExists.phone2,
          city: userExists.city,
          state: userExists.state,
          status: userExists.status,
        });
      }

      // Montar a url do envio de email (APP_URL)
      const emailcode = crypto.randomBytes(6).toString('hex');
      const app = req.body.app ? req.body.app : 'Senar';
      const url_default = `${process.env.APP_URL}/validar-cadastro/${emailcode}`;
      const url_email = req.body.url_email
        ? req.body.url_email + emailcode
        : url_default;

      await sendEmail(req.body.name, req.body.email, app, url_email);

      // gravar com status false e código hash
      const {
        id,
        name,
        email,
        phone1,
        phone2,
        city,
        state,
        status,
      } = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
        status: false,
        visible: false,
        city: req.body.city,
        state: req.body.state,
        email_code: emailcode,
      });

      return res.json({ id, name, email, phone1, phone2, city, state, status });
    }

    // Criação de usuário por outro usuário, que faça parte de um grupo admin
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, phone1, phone2, city, state } = await User.create(
      req.body
    );

    return res.json({ id, name, email, phone1, phone2, city, state });
  }

  async update(req, res) {
    // Atualização de dados geral
    if (req.body.email) {
      const { email, oldPassword } = req.body;
      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
        const userExists = await User.findOne({
          where: { email: req.body.email },
        });

        if (userExists) {
          return res.status(403).json({ error: 'You dont have permission' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password dows not match' });
      }

      const {
        id,
        name,
        phone1,
        phone2,
        status,
        visible,
        city,
        state,
      } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
        phone1,
        phone2,
        status,
        visible,
        city,
        state,
      });
    }

    // Atualização de validação de código de SMS
    if (req.body.phone_login) {
      const { phone_login, phone_code } = req.body;
      const userExists = await User.findOne({
        where: { phone_login, phone_code },
      });

      if (userExists) {
        const updatedAtPlus5 = new Date(
          userExists.updatedAt.getTime() + 60 * 100000
        );

        if (updatedAtPlus5 < new Date()) {
          return res.status(403).json({ error: '5 min time limit exceeded' });
        }

        const accessToken = jwt.sign({ id: userExists.id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        });

        const accessTokenRefresh = jwt.sign(
          { id: userExists.id },
          authConfig.secretRefresh
        );

        const {
          id,
          name,
          email,
          phone1,
          phone2,
          visible,
          city,
        } = await userExists.update(
          { status: true, visible: true, refresh_token: accessTokenRefresh },
          { where: { id: userExists.id } }
        );

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

      return res.status(403).json({ error: 'User not found, or code invalid' });
    }

    if (req.params.email_code) {
      const { email_code } = req.params;

      const userExists = await User.findOne({
        where: { email_code },
      });

      if (userExists) {
        const { status, visible } = await userExists.update({
          status: true,
          visible: true,
          email_code: null,
        });

        return res.json({
          status,
          visible,
        });
      }
    }

    return res.status(403).json({ error: 'No update found in backend' });
  }
}

export default new UserController();
