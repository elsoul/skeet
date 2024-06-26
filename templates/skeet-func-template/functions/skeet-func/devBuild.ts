import { build } from 'esbuild'

void (async () => {
  await build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    outfile: './dist/index.js',
    platform: 'node',
    define: {
      'process.env.NODE_ENV': `"development"`,
    },
    format: 'esm',
    tsconfig: './tsconfig.json',
    external: [
      '@skeet-framework/firestore',
      'firebase-admin',
      '@skeet-framework/utils',
      'fs',
      'firebase-functions',
      'dotenv',
      '@skeet-framework/cloud-task',
      '@skeet-framework/ai',
    ],
  })

  await build({
    entryPoints: ['../../common/**/*'],
    bundle: true,
    minify: true,
    outdir: './dist',
    platform: 'node',
    define: {
      'process.env.NODE_ENV': `"development"`,
    },
    format: 'esm',
    external: [
      '../../common/*',
      '@skeet-framework/firestore',
      'firebase-admin',
      '@skeet-framework/utils',
      'fs',
      'firebase-functions',
      'dotenv',
      '@skeet-framework/cloud-task',
      '@skeet-framework/ai',
    ],
    tsconfig: './tsconfig.json',
  })
})()
