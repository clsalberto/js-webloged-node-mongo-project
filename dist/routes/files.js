"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _UploadController = _interopRequireDefault(require("../app/controllers/files/UploadController"));

var _multer2 = _interopRequireDefault(require("../config/multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const upload = (0, _multer.default)(_multer2.default);
/* File Upload Rotes */

routes.get('/files', _UploadController.default.index);
routes.post('/files', upload.single('file'), _UploadController.default.store);
var _default = routes;
exports.default = _default;