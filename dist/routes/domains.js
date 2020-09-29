"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ActiveRegisterDomainController = _interopRequireDefault(require("../app/controllers/domains/ActiveRegisterDomainController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
/* Domain Rotes */

routes.post('/domain/:token', _ActiveRegisterDomainController.default.store);
var _default = routes;
exports.default = _default;