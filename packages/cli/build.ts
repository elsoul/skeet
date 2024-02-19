import { build } from 'esbuild'
import { aliasPath } from 'esbuild-plugin-alias-path'
import path from 'path'
;(async () => {
  await build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: 'inline',
    sourcesContent: true,
    outfile: './dist/index.js',
    platform: 'node',
    format: 'cjs',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    metafile: true,
  })
})()
