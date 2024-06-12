const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript')
  ],
  plugins: ['only-warn'],
  parserOptions: {
    project
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
  rules: {
    'import/order': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/no-extraneous-class': 'off'
  }
}
