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
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
