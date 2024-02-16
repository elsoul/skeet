import { build } from 'esbuild'
;(async () => {
  const res = await build({
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
    alias: {
      '@': './src',
    },
  })
})()
