// Import the necessary modules using ESM syntax
import esbuild from 'esbuild'
;(async () => {
  console.log('Building...')
  await esbuild.build({
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
      'dotenv',
      '@google-cloud/tasks',
      'buffer',
      'google-auth-library',
    ],
  })
  console.log('Build complete ⭐️')
})()
