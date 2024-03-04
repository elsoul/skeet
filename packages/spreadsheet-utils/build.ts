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
    external: ['path', 'fs', 'child_process', 'util', 'dotenv', 'googleapis'],
  })
  console.log('Build complete ⭐️')
})()
