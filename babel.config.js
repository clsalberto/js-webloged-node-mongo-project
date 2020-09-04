module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~/controllers': './src/app/controllers',
          '~/models': './src/app/models',
          '~/views': './src/app/views',
          '~/middlewares': './src/app/middlewares',
          '~/services': './src/app/services',
          '~/config': './src/config',
          '~/tests': './tests'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
