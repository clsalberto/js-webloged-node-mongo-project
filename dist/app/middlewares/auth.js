"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: 'No token provided'
    });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return response.status(401).json({
      error: 'Token error'
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({
      error: 'Token malformatted'
    });
  }

  _jsonwebtoken.default.verify(token, _auth.default.secret, (err, decoded) => {
    if (err) return response.status(401).json({
      error: 'Token invalid'
    });
    request.userId = decoded.id;
    return next();
  });
};

exports.default = _default;