"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  db: {
    address: process.env.MONGO_URL,
    collection: 'jobs'
  }
};
exports.default = _default;