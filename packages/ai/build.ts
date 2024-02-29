// Import the necessary modules using ESM syntax
import esbuild from 'esbuild'
import path from 'path'
import aliasPath from 'esbuild-plugin-alias-path'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
// Using an IIFE (Immediately Invoked Function Expression) with async to run asynchronous code
;(async () => {
  console.log('Building...')
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: 'inline',
    sourcesContent: true,
    outfile: path.resolve('dist/index.js'),
    platform: 'node',
    format: 'esm',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    metafile: true,
    external: ['path', '@skeet-framework/utils', 'fs', 'child_process', 'util'],
    plugins: [
      aliasPath({
        alias: {
          '@/*': path.resolve('./src'),
        },
      }),
    ],
  })
  console.log('Build complete ⭐️')
})()
