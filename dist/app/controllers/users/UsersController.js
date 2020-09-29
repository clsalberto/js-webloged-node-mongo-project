"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async index(request, response) {
    try {
      const users = await _User.default.find();
      return response.json(users);
    } catch (error) {
      return response.json({
        error
      });
    }
  }

}

var _default = new UsersController();

exports.default = _default;