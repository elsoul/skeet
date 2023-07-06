export const eslintrcJson = async (appName: string, template: string) => {
  const filePath = `${appName}/.eslintrc.json`
  let body = {}
  if (template === 'React Native (Expo)') {
    body = {
      extends: [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      parser: '@typescript-eslint/parser',
      plugins: ['react-native', '@typescript-eslint', 'react-hooks'],
      env: {
        browser: true,
        es2021: true,
        'react-native/react-native': true,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/no-explicit-any': 0,
        'react-native/no-raw-text': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/ban-ts-comment': [
          'off',
          {
            'ts-ignore': 'allow-with-description',
          },
        ],
      },
    }
  } else if (template === 'Next.js') {
    body = {
      extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-hooks'],
      env: {
        browser: true,
        es2021: true,
        'react-native/react-native': true,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/no-explicit-any': 0,
        'react-native/no-raw-text': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/ban-ts-comment': [
          'off',
          {
            'ts-ignore': 'allow-with-description',
          },
        ],
      },
    }
  }

  return {
    filePath,
    body,
  }
}
