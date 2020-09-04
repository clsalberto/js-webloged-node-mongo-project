const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  rootDir: root,
  clearMocks: true,
  testEnvironment: 'node',
  moduleNameMapper: {
    '~/controllers/(.*)': '<rootDir>/src/app/controllers/$1',
    '~/models/(.*)': '<rootDir>/src/app/models/$1',
    '~/views/(.*)': '<rootDir>/src/app/views/$1',
    '~/middlewares/(.*)': '<rootDir>/src/app/middlewares/$1',
    '~/services/(.*)': '<rootDir>/src/app/services/$1',
    '~/config/(.*)': '<rootDir>/src/config/$1',
    '~/tests/(.*)': '<rootDir>/test/$1s'
  }
}
