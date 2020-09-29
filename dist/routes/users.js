"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _RegisterUserController = _interopRequireDefault(require("../app/controllers/users/RegisterUserController"));

var _UsersController = _interopRequireDefault(require("../app/controllers/users/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
/* Users Rotes */

routes.get('/users', _UsersController.default.index);
routes.post('/users', _RegisterUserController.default.store);
var _default = routes;
exports.default = _default;