import { Command } from 'npm:commander@12.0.0'
import denoJson from '/deno.json' with { type: 'json' }

/**
 * CLI Program for Skeet
 *
 * This is the entry point for the Skeet CLI, a full-stack Deno serverless framework.
 * It supports commands like initializing a new Skeet project.
 */
const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack Deno Serverless framework')
  .version(denoJson.version)

/**
 * The main function that sets up the CLI.
 */
const main = () => {
  program
    .command('init')
    .description('Initialize a new Skeet project')
    .action(() => {
      console.log('Initializing new Skeet project...')
    })
  program.parse()
}

main()
