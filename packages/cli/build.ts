import { build } from 'esbuild'
import path from 'path'
import { aliasPath } from 'esbuild-plugin-alias-path'
;(async () => {
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
    external: ['path'],
    plugins: [
      aliasPath({
        alias: {
          '@/*': path.resolve(__dirname, './src'),
        },
      }),
    ],
  })
})()
