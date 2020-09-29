"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TokenSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  expired: {
    type: Date,
    require: true
  },
  status: {
    type: String,
    required: true,
    default: 'PENDING'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});

var _default = _mongoose.default.model('Token', TokenSchema);

exports.default = _default;