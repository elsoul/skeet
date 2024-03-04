import { build } from 'esbuild'

void (async () => {
  await build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    outfile: './dist/index.js',
    platform: 'node',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    format: 'esm',
    tsconfig: './tsconfig.json',
    external: ['@skeet-framework/firestore', 'firebase-admin', 'fs'],
  })

  await build({
    entryPoints: ['../../common/**/*'],
    bundle: true,
    minify: true,
    outdir: './dist',
    platform: 'node',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    format: 'esm',
    external: [
      '../../common/*',
      '@skeet-framework/firestore',
      'firebase-admin',
      'fs',
    ],
    tsconfig: './tsconfig.json',
  })
})()
