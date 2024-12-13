module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', 'jsx-a11y', 'simple-import-sort', '@typescript-eslint'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'warn',
    'no-cond-assign': ['error', 'always'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'jsx-a11y/anchor-is-valid': 'error',
    'simple-import-sort/imports': [
      'error',
      { groups: [['^react(.*)$'], ['^(?!@|^./|^../).*'], ['@(.*)'], ['^[../]'], ['^[./]']] },
    ],
  },
};
