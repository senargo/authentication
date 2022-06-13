"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _redis = require('redis'); var _redis2 = _interopRequireDefault(_redis);
var _url = require('url'); var _url2 = _interopRequireDefault(_url);
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);
var _ratelimitredis = require('rate-limit-redis'); var _ratelimitredis2 = _interopRequireDefault(_ratelimitredis);
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);
require('express-async-errors');
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(_express2.default.json());
    this.server.use(_helmet2.default.call(void 0, ));
    this.server.use(
      _cors2.default.call(void 0, {
        origin: true, // passar o endereço do front aqui como string (.env)
      })
    );

    this.server.use(
      '/files',
      _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      const redisURL = _url2.default.parse(process.env.REDIS_URL);

      const redisClient = _redis2.default.createClient(redisURL.port, redisURL.hostname, {
        no_ready_check: true,
      });

      redisClient.auth(redisURL.auth.split(':')[1]);

      this.server.use(
        new (0, _expressratelimit2.default)({
          store: new (0, _ratelimitredis2.default)({
            client: redisClient,
            windowMs: 1000 * 60 * 15, // permitido 100 requisições a cada 15min
            max: 100,
          }),
        })
      );
    }
  }

  routes() {
    this.server.use(_routes2.default);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new (0, _youch2.default)(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

exports. default = new App().server;
