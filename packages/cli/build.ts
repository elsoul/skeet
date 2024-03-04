import { build } from 'esbuild'
;(async () => {
  console.log('Building...')
  await build({
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
      'fs',
      'child_process',
      'util',
      'dotenv',
      'commander',
      'dotenv-cli',
      'inquirer',
      'chalk',
      'prompt',
      'cli-spinner',
      'cli-table3',
      '@skeet-framework/ai',
    ],
  })
  console.log('Build complete ⭐️')
})()
