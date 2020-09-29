"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _File = _interopRequireDefault(require("../../models/File"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UploadController {
  async index(request, response) {
    const files = await _File.default.find();
    return response.json(files);
  }

  async store(request, response) {
    const {
      originalname: name,
      filename: path,
      path: url,
      size
    } = request.file;
    const file = await _File.default.create({
      name,
      path,
      url,
      size
    });
    return response.json(file);
  }

}

var _default = new UploadController();

exports.default = _default;