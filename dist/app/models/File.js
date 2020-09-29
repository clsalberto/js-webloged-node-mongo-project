"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _path = require("path");

var _util = require("util");

var _cloudinary2 = _interopRequireDefault(require("../../config/cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FileSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  url: {
    type: String,
    require: true
  },
  size: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
FileSchema.pre('save', function () {
  if (process.env.STORAGE_TYPE === 'local') {
    return `${process.env.APP_URL}/file/${this.path}`;
  }
});
FileSchema.pre('deleteOne', {
  document: true
}, function () {
  if (process.env.STORAGE_TYPE === 'local') {
    return (0, _util.promisify)(_fs.default.unlink)((0, _path.resolve)(__dirname, '..', '..', '..', 'tmp', 'uploads', this.path));
  } else {
    const storageCloud = _cloudinary.default.v2;
    storageCloud.config(_cloudinary2.default);
    return storageCloud.api.delete_resources([this.path]);
  }
});

var _default = _mongoose.default.model('File', FileSchema);

exports.default = _default;