// Import the necessary modules using ESM syntax
import esbuild from 'esbuild'
void (async () => {
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
      'process.env.NODE_ENV': `"development"`,
    },
    metafile: true,
    external: [
      'path',
      '@skeet-framework/utils',
      'fs',
      'child_process',
      'util',
      'dotenv',
      '@hono/node-server',
      'hono',
      '@prisma/client',
      '../../common',
    ],
  })
  console.log('Build complete ⭐️')
})()
