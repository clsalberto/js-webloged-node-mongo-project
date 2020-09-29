"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerExpressHandlebars = _interopRequireDefault(require("nodemailer-express-handlebars"));

var _path = require("path");

var _mail = _interopRequireDefault(require("../config/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Mail {
  constructor() {
    this.transporter = _nodemailer.default.createTransport(_mail.default);
    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = (0, _path.resolve)(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use('compile', (0, _nodemailerExpressHandlebars.default)({
      viewEngine: _expressHandlebars.default.create({
        layoutsDir: (0, _path.resolve)(viewPath, 'layouts'),
        partialsDir: (0, _path.resolve)(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName: '.hbs'
    }));
  }

  sendMail(message) {
    return this.transporter.sendMail({ ..._mail.default.default,
      ...message
    });
  }

}

var _default = new Mail();

exports.default = _default;