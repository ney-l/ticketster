const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [path.join(__dirname, './tsconfig.json')],
  },
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/semi': 0,
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
  },
};