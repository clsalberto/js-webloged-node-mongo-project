"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _package = require("../../package.json");

var _domains = _interopRequireDefault(require("./domains"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.get('/', (request, response) => {
  const project = {
    project: 'Webloged Api',
    description: _package.description,
    author: _package.author,
    version: _package.version
  };
  return response.json(project);
});
routes.use(_users.default);
routes.use(_domains.default);
var _default = routes;
exports.default = _default;