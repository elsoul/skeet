export const packageJson = async (appName: string) => {
  const filePath = `${appName}/package.json`
  const body = {
    name: appName,
    version: '0.0.1',
    description: 'Skeet Framework',
    main: 'dist/index.js',
    repository: 'https://github.com/elsoul/skeet-cli.git',
    author: 'ELSOUL LABO B.V.',
    license: 'Apache-2.0',
    private: true,
    scripts: {
      dev: 'firebase emulators:start',
      deploy: 'firebase deploy --only functions',
    },
    devDependencies: {
      '@types/jest': '29.5.0',
      '@types/node': '18.15.10',
      'babel-loader': '9.1.2',
      esbuild: '0.17.14',
      eslint: '8.36.0',
      'eslint-config-prettier': '8.8.0',
      nodemon: '2.0.22',
      'npm-check-updates': '16.8.0',
      prettier: '2.8.7',
      'ts-jest': '29.0.5',
      'ts-loader': '9.4.2',
      'tsconfig-paths': '4.1.2',
      typescript: '5.0.2',
    },
  }
  return {
    filePath,
    body,
  }
}
