import Dotenv from 'dotenv'
import { Command, ErrorOptions } from 'commander'
import fs from 'fs'
import { VERSION } from '@/lib/version'
import {
  YarnCmd,
  addJsonEnv,
  create,
  createServiceAccountKey,
  deploy,
  init,
  setupIam,
  setupNetwork,
  yarn,
  listFunctions,
  syncRoutings,
  syncModels,
  syncTypes,
} from '@/cli'
import { server } from '@/cli/server'
import { addFunctions } from './cli/add'
import { addRounting } from './cli/add/routing'
import { Logger } from './lib/logger'
import { skeetCloudConfigAppGen } from './templates/init/skeet-cloud.config-app'
import { getHTTPRoutingFiles } from './lib/getHttpRountings'
import { convertToKebabCase } from './utils/string'
import { getFunctionInfo } from './lib/getSkeetConfig'
import { addBackendSetup } from './cli/add/addBackendSetup'
import { deleteRoutings } from './cli/delete'

export type SkeetCloudConfig = {
  app: AppConfig
  functions: FunctionConfig[]
  cloudArmor?: CloudArmor
}

export type AppConfig = {
  name: string
  projectId: string
  region: string
  appDomain: string
  functionsDomain: string
}

export type FunctionConfig = {
  name: string
  methods: FunctionMethods[]
}

export type FunctionMethods = {
  name: string
  url: string
  pubsub: boolean
  scheduler: string
}

export type CloudArmor = Array<SecurityPolicy>

export type SecurityPolicy = {
  securityPolicyName: string
  rules: [
    {
      priority: string
      description: string
      options: { [key: string]: string }
    }
  ]
}

export enum ArmorAction {
  ALLOW = 'allow',
  DENY1 = 'deny-403',
  DENY2 = 'deny-404',
  DENY3 = 'deny-429',
  DENY4 = 'deny-502',
  REDIRECT = 'redirect',
}

export const importConfig = async () => {
  try {
    const config = fs.readFileSync(`${process.cwd()}/skeet-cloud.config.json`)
    const json: SkeetCloudConfig = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const importFirebaseConfig = async () => {
  try {
    const config = fs.readFileSync(`${process.cwd()}/firebase.json`)
    const json = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack TypeScript Serverless framework')
  .version(VERSION)

Dotenv.config()

async function main() {
  // Please check the descriptions if they are correct.
  try {
    program
      .command('create')
      .argument('<appName>', 'Name of the app')
      .description('Create Skeet App')
      .action(async (appName: string) => {
        await create(appName)
      })
    program
      .command('server')
      .description('Run Skeet Server')
      .alias('s')
      .action(server)
    program
      .command('deploy')
      .description('Deploy Skeet APP to Google Cloud Platform')
      .action(deploy)
    program
      .command('init')
      .option('--only-config', 'Generate Skeet Cloud Config', false)
      .option('--skip-setup-cloud', 'Generate Skeet Cloud Config', false)
      .description('Generate Skeet Cloud Config')
      .action(async (options) => {
        if (options.onlyConfig) {
          const data = await skeetCloudConfigAppGen()
          fs.writeFileSync(data.filePath, data.body)
        } else {
          await init(options.skipSetupCloud)
        }
      })

    const iam = program.command('iam').description('Skeet IAM Comannd')
    iam
      .command('init')
      .description('Setup IAM for Google Cloud Platform')
      .action(async () => {
        await setupIam()
      })
    iam
      .command('pull')
      .description('Download IAM for Google Cloud Platform')
      .action(async () => {
        const config = await importConfig()
        await createServiceAccountKey(config.app.projectId, config.app.name)
      })
    iam
      .command('sync')
      .description('Sync Service Account Key as GitHub Secret')
      .action(async () => {
        await addJsonEnv()
      })
    program
      .command('vpc')
      .description('Setup VPC for Google Cloud Platform')
      .action(async () => {
        await setupNetwork()
      })
    program
      .command('yarn')
      .argument(
        '<yarnCmd>',
        Object.entries(YarnCmd)
          .map(([_, value]) => value)
          .join(',')
      )
      .option('-p, --p <packageName>', 'npm package name', '')
      .option('-D', 'Dependency environment', false)
      .action(async (yarnCmd: string, options) => {
        if (yarnCmd === 'add' && options.p === '') {
          await Logger.error('You need to define package name!')
          process.exit(1)
        }
        await yarn(yarnCmd, options.p, options.D)
      })
    const add = program.command('add').description('Add Comannd')
    add
      .command('functions')
      .argument('<functionsName>', 'Functions Name - e.g. openai')
      .action(async (functionsName: string) => {
        await addFunctions(functionsName)
      })
    add
      .command('routings')
      .argument('<functionsName>', 'Functions Name - e.g. openai')
      .action(async (functionsName: string) => {
        const files = await getHTTPRoutingFiles()
        const paths = []
        for (const file of files) {
          for (const path of file.httpEndpoints) {
            const kebab = convertToKebabCase(path)
            const functionInfo = await getFunctionInfo(kebab)
            const pathString = `/${file.functionName}/${kebab}=${functionInfo.backendService}`
            paths.push(pathString)
          }
        }
        await addBackendSetup(functionsName)
        await addRounting(functionsName, paths)
      })

    const sync = program.command('sync').description('Skeet Sync Comannd')
    sync
      .command('models')
      .description('Sync Models')
      .action(async () => {
        await syncModels()
      })
    sync
      .command('types')
      .description('Sync Types')
      .action(async () => {
        await syncTypes()
      })
    sync
      .command('routings')
      .description('Sync Routings')
      .action(async () => {
        await syncRoutings()
      })

    const d = program
      .command('delete')
      .alias('d')
      .description('Skeet Delete Command')
    d.command('routings')
      .argument('<methodName>', 'Functions Name - e.g. openai')
      .description('Delete Routings')
      .action(async (methodName: string) => {
        await deleteRoutings(methodName)
      })

    const list = program.command('list').description('Show Skeet App List')
    list
      .command('functions')
      .description('Show Skeet Functions List')
      .action(async () => {
        await listFunctions()
      })

    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
