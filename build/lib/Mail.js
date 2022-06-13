"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _mail = require('../config/mail'); var _mail2 = _interopRequireDefault(_mail);

class Mail {
  constructor() {
    const { host, port, secure, auth } = _mail2.default;
    this.transporter = _nodemailer2.default.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ..._mail2.default.default,
      ...message,
    });
  }
}

exports. default = new Mail();
