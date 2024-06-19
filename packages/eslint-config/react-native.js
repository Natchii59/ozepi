const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react')
  ],
  plugins: ['only-warn'],
  parserOptions: {
    project
  },
  ignorePatterns: ['node_modules/', '.expo/', '.eslintrc.js'],
  rules: {
    'import/order': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-unstable-nested-components': 'off'
  }
}
