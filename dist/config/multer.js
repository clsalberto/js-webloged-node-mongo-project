"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _multerStorageCloudinary = require("multer-storage-cloudinary");

var _path = require("path");

var _cloudinary2 = _interopRequireDefault(require("../config/cloudinary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storageCloud = _cloudinary.default.v2;
storageCloud.config(_cloudinary2.default);

const storageLocal = _multer.default.diskStorage({
  destination: (0, _path.resolve)(__dirname, '..', '..', 'tmp', 'uploads'),
  filename: (request, file, cb) => {
    _crypto.default.randomBytes(16, (error, response) => {
      if (error) return cb(error);
      return cb(null, response.toString('hex') + (0, _path.extname)(file.originalname));
    });
  }
});

const storageCloudinary = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: storageCloud,
  params: {
    folder: (request, file) => {
      const {
        dir
      } = request.query;
      return !dir ? 'webloged' : `webloged/${dir}`;
    }
  }
});
var _default = {
  storage: process.env.STORAGE_TYPE === 'local' ? storageLocal : storageCloudinary,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_request, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
};
exports.default = _default;