export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        browser: true,
        es6: true,
      },
    },
    rules: {
      'no-console': 'error',
      'no-unused-vars': 'error',
    },
  },
];
