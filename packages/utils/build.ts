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
    external: ['fs', 'path', 'util', 'child_process', 'crypto', 'dotenv'],
  })
})()
