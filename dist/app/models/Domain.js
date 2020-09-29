"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DomainSchema = new _mongoose.default.Schema({
  owner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  logo: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'File'
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  theme: {
    primaryColor: {
      type: String,
      required: true
    },
    secondaryColor: {
      type: String,
      required: true
    },
    themeType: {
      type: String,
      required: true,
      default: 'light'
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});

var _default = _mongoose.default.model('Domain', DomainSchema);

exports.default = _default;