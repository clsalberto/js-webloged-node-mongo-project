"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _path = require("path");

var _youch = _interopRequireDefault(require("youch"));

var _routes = _interopRequireDefault(require("../routes"));

require("../database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor() {
    this.server = (0, _express.default)();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use((0, _cors.default)({
      origin: process.env.FRONT_URL
    }));
    this.server.use((0, _helmet.default)());
    this.server.use(_express.default.json());
    this.server.use('/file', _express.default.static((0, _path.resolve)(__dirname, '..', '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(_routes.default);
  }

  exceptionHandler() {
    this.server.use(async (error, request, response, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new _youch.default(error, request).toJSON();
        return response.status(500).json(errors);
      }

      return response.status(500).json({
        error: 'Internal server error'
      });
    });
  }

}

var _default = new App().server;
exports.default = _default;