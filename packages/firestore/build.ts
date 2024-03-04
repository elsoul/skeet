import { build } from 'esbuild'
;(async () => {
  console.log('Building...')
  await build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: 'inline',
    sourcesContent: true,
    outdir: 'dist',
    platform: 'node',
    format: 'esm',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    metafile: true,
    external: [
      'path',
      '@skeet-framework/utils',
      'fs',
      'child_process',
      'util',
      'firebase-admin',
    ],
  })
  console.log('Build complete ⭐️')
})()
