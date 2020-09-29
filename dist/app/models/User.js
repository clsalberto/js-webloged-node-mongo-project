"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.default.Schema({
  avatar: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'File'
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  profile: {
    gender: String,
    birthDate: String,
    aboutMe: String
  },
  domains: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Domain'
  }],
  active: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});
UserSchema.pre('save', async function () {
  if (this.password) {
    this.password = await _bcryptjs.default.hash(this.password, 8);
  }
});

var _default = _mongoose.default.model('User', UserSchema);

exports.default = _default;