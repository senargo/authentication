import jwtDecode from 'jwt-decode';
import 'dotenv/config';

import { Client } from 'pg';

export default async (req, res, next) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  client.connect();

  const token = req.headers.authorization.split(' ')[1];
  const decodedJwt = jwtDecode(token);
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
