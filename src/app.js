import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import url from 'url';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: true, // passar o endereço do front aqui como string (.env)
      })
    );

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      const redisURL = url.parse(process.env.REDIS_URL);

      const redisClient = redis.createClient(redisURL.port, redisURL.hostname, {
        no_ready_check: true,
      });

      redisClient.auth(redisURL.auth.split(':')[1]);

      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redisClient,
            windowMs: 1000 * 60 * 15, // permitido 100 requisições a cada 15min
            max: 100,
          }),
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
