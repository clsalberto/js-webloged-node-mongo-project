"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Domain = _interopRequireDefault(require("../../models/Domain"));

var _Token = _interopRequireDefault(require("../../models/Token"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ActiveRegisterDomainController {
  async store(request, response) {
    const {
      token
    } = request.params;
    const {
      logo,
      name,
      slug,
      theme: {
        primaryColor,
        secondaryColor,
        themeType
      }
    } = request.body;

    try {
      const validateHash = await _Token.default.findOne({
        hash: token
      });

      if (!validateHash) {
        return response.status(400).json({
          error: 'Token does not exist.'
        });
      }

      if (validateHash.status === 'USED') {
        return response.status(400).json({
          error: 'Token already used.'
        });
      }

      if (validateHash.expired < new Date()) {
        if (validateHash.status !== 'EXPIRED') {
          await validateHash.updateOne({
            status: 'EXPIRED'
          });
        }

        return response.status(400).json({
          error: 'Expired token.'
        });
      }

      const user = await _User.default.findOne({
        email: validateHash.email
      });

      if (!user) {
        return response.status(400).json({
          error: 'User does not exist.'
        });
      }

      const domain = await _Domain.default.create({
        owner: user._id,
        logo,
        name,
        slug,
        theme: {
          primaryColor,
          secondaryColor,
          themeType
        }
      });
      await validateHash.updateOne({
        status: 'USED'
      });
      await user.updateOne({
        domains: [domain._id],
        active: true
      });
      return response.json(domain);
    } catch (error) {
      return response.json({
        error
      });
    }
  }

}

var _default = new ActiveRegisterDomainController();

exports.default = _default;