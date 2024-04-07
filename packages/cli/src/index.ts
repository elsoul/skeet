import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import { aiCommands } from '@/cli/ai'
import { configCommands } from '@/cli/config'
import { runCommands } from '@/cli/run'
import { deleteSubCommands } from '@/cli/sub/delete'
import { listSubCommands } from '@/cli/get/index'
import { syncSubCommands } from '@/cli/sub/sync'
import { addSubCommands } from '@/cli/sub/add'
import { iamSubCommands } from '@/cli/sub/iam'
import { dockerSubCommands } from '@/cli/sub/docker'
import { genCommands } from '@/cli/gen'
import { curlCommands } from '@/cli/curl'
import { loginCommands } from '@/cli/login'
import { deployCommands } from '@/cli/deploy'
import { createCommands } from '@/cli/create'
import { serverCommands } from '@/cli/server'
import { logCommands } from '@/cli/log'
import { dbSubCommands } from '@/cli/sub/db'
import { newCommands } from './cli/new'
import { consoleCommands } from './cli/console'
import { checkCommands } from './cli/check'
import { initCommands } from './cli'

export const SKEET_CONFIG_PATH = './skeet-cloud.config.json'
export const DEFAULT_FUNCTION_NAME = 'skeet'
export const FIREBASERC_PATH = './.firebaserc'
export const TRANSLATE_PATH = 'tmp/ai/translate.json'
export const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack TypeScript Serverless framework')
  .version(VERSION)

dotenv.config()

export const lang = process.env.SKEET_LANG || 'en'

async function main() {
  try {
    await createCommands()
    await serverCommands()
    await deployCommands()
    await initCommands()
    await loginCommands()
    await curlCommands()
    await genCommands()
    await logCommands()
    await dockerSubCommands()
    dbSubCommands()
    await iamSubCommands()
    await addSubCommands()
    await syncSubCommands()
    await deleteSubCommands()
    listSubCommands()
    aiCommands()
    configCommands()
    runCommands()
    await newCommands()
    await consoleCommands()
    await checkCommands()
    // program
    //   .command('test')
    //   .description('Run tests')
    //   .action(async () => {
    //   })

    program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
