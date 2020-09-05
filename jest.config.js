const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  rootDir: root,
  clearMocks: true,
  testEnvironment: 'node'
}
