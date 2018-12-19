module.exports = {
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'typescript-eslint-parser'
  }
};
