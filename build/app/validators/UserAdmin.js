"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jwtdecode = require('jwt-decode'); var _jwtdecode2 = _interopRequireDefault(_jwtdecode);
require('dotenv/config');

var _pg = require('pg');

exports. default = async (req, res, next) => {
  const client = new (0, _pg.Client)({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  client.connect();

  const token = req.headers.authorization.split(' ')[1];
  const decodedJwt = _jwtdecode2.default.call(void 0, token);
  const { id } = decodedJwt;

  const query = `SELECT g.is_admin FROM user_groups as ug
      INNER JOIN groups as g ON g.id = ug.group_id
      WHERE g.is_admin IS TRUE AND ug.user_id = ${id} LIMIT 1`;

  client.query(query, (err, dbRes) => {
    if (err) {
      return res.status(503).json({ error: err });
    }

    if (!dbRes.rowCount) {
      return res.status(403).json({ error: 'The user is not a admin' });
    }

    client.end();
    return next();
  });
};
