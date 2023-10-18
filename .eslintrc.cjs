module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', './.eslintrc.common.cjs'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
  env: {
    browser: true,
  },
  ignorePatterns: ['node_modules', 'output'],
};
