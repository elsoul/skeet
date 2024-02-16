export const packageJson = async (appName: string) => {
  const filePath = `${appName}/package.json`
  const body = {
    name: appName,
    version: '0.0.1',
    description: `${appName}`,
    private: true,
    scripts: {
      skeet: 'run-p skeet:*',
      'skeet:skeet': 'pnpm -F skeet-func dev',
      'skeet-func': 'pnpm -F skeet-func',
      'skeet:dev': 'firebase emulators:start',
      deploy: 'firebase deploy',
      'functions:deploy': 'firebase deploy --only functions',
    },
    devDependencies: {
      '@types/node': '20.11.0',
      'babel-loader': '9.1.2',
      esbuild: '0.17.14',
      eslint: '8.36.0',
      'eslint-config-prettier': '8.8.0',
      nodemon: '2.0.22',
      'npm-check-updates': '16.14.6',
      'npm-run-all': '4.1.5',
      prettier: '3.0.3',
      'ts-loader': '9.4.2',
      'tsconfig-paths': '4.1.2',
      typescript: '5.0.4',
    },
  }
  return {
    filePath,
    body,
  }
}
