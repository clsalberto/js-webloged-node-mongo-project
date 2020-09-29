"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _Token = _interopRequireDefault(require("../../models/Token"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegisterUserController {
  async store(request, response) {
    const {
      name,
      surname,
      email,
      password
    } = request.body;

    try {
      const userExists = await _User.default.findOne({
        email
      });

      if (userExists) {
        return response.status(400).json({
          error: 'User already exists.'
        });
      }

      const user = await _User.default.create({
        name,
        surname,
        email,
        password
      });

      const hash = _crypto.default.randomBytes(20).toString('hex');

      const expired = new Date();
      expired.setHours(expired.getHours() + 1);

      if (user) {
        await _Token.default.create({
          email,
          hash,
          expired
        });
      }

      user.password = undefined;
      return response.json(user);
    } catch (error) {
      return response.json({
        error
      });
    }
  }

}

var _default = new RegisterUserController();

exports.default = _default;