import { Command } from '@cliffy'
import denoJson from '/deno.json' with { type: 'json' }

type Options = {
  debug?: boolean | undefined
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}

type Arguments = [string, (string | undefined)?]

await new Command()
  .name('skeet')
  .version(denoJson.version)
  .description('Skeet Framework CLI - A Deno framework for web3 applications')
  .globalOption('-d, --debug', 'Enable debug output.')
  .action((options, ...args) => console.log('Main command called.'))
  // Child command 1.
  .command('foo', 'Foo sub-command.')
  .option('-f, --foo', 'Foo option.')
  .arguments('<value:string>')
  .action((options, ...args) => console.log('Foo command called.'))
  // Child command 2.
  .command('bar', 'Bar sub-command.')
  .option('-b, --bar', 'Bar option.')
  .arguments('<input:string> [output:string]')
  .action((options, ...args) => console.log('Bar command called.'))
  .parse(Deno.args)
