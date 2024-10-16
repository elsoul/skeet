import { Command } from 'npm:commander@12.0.0'
import denoJson from '/deno.json' with { type: 'json' }

const program = new Command()
program
  .name('skeet')
  .description('CLI for Skeet - Full-stack Deno Serverless framework')
  .version(denoJson.version)

const main = () => {
  program
    .command('init')
    .description('Initialize a new Skeet project')
    .action(() => {
      console.log('Initializing new Skeet project...')
    })

  console.log(Deno.args)
  program.parse(Deno.args)
}

main()
