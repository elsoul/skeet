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
    outfile: 'dist/index.js',
    platform: 'node',
    format: 'esm',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    external: ['fs', 'path', 'util', 'child_process', 'crypto', 'dotenv'],
  })
  console.log('Build complete ⭐️')
})()
