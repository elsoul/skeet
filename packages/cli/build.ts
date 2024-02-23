import { build } from 'esbuild'
import path from 'path'
import { aliasPath } from 'esbuild-plugin-alias-path'
;(async () => {
  console.log('Building...')
  await build({
    entryPoints: [path.resolve(__dirname, 'src/index.ts')],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: 'inline',
    sourcesContent: true,
    outfile: path.resolve(__dirname, 'dist/index.js'),
    platform: 'node',
    format: 'cjs',
    define: {
      'process.env.NODE_ENV': `"production"`,
    },
    metafile: true,
    external: ['path', '@skeet-framework/utils', 'fs', 'child_process', 'util'],
    plugins: [
      aliasPath({
        alias: {
          '@/*': path.resolve(__dirname, './src'),
        },
      }),
    ],
  })
})()
