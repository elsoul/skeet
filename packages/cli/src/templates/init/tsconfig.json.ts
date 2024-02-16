export const tsconfigJson = async (appName: string) => {
  const filePath = `${appName}/tsconfig.json`
  const body = {
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
        '@lib/*': ['lib/*'],
        '@root/*': ['./*'],
      },
    },
    'ts-node': {
      compilerOptions: {
        module: 'NodeNext',
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
    exclude: ['node_modules', 'out', '.next', 'build', 'dist'],
  }
  return {
    filePath,
    body,
  }
}
