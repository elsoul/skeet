module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-ts-comment': [
      'off',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    // temprary disable
    // "@typescript-eslint/no-floating-promises": "error",
    // "@typescript-eslint/no-misused-promises": [
    //   "error",
    //   {
    //     "checksVoidReturn": false
    //   }
    // ]
    // temporary enable
    'no-useless-escape': 'off',
    'no-useless-catch': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-empty': 'off',
    'no-case-declarations': 'off',
  },
  overrides: [
    {
      files: ['./website/**/*.ts', './website/**/*.tsx'],
      extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-hooks'],
      env: {
        browser: true,
        es2021: true,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-function': 0,
        'react-native/no-inline-styles': 0,
        'no-constant-condition': 0,
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/ban-ts-comment': [
          'off',
          {
            'ts-ignore': 'allow-with-description',
          },
        ],
      },
    },
  ],
}
