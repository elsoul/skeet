import Dotenv from 'dotenv'
import { Command } from 'commander'
import fs from 'fs'
import { VERSION } from '@/lib/version'
import {
  addJsonEnv,
  server,
  create,
  createServiceAccountKey,
  deploy,
  init,
  setupIam,
  yarn,
  listFunctions,
  syncRoutings,
  syncModels,
  syncTypes,
  syncArmors,
  addFunctions,
  addMethod,
  login,
  addModel,
  curl,
  deleteRoutings,
  listHttps,
  initLb,
  skeetTest,
  addFirebaseApp,
  getZone,
  addWebAppDomain,
  addSecret,
  getSecret,
} from '@/cli'
import { Logger } from '@/lib/logger'
import { skeetCloudConfigAppGen } from '@/templates/init/skeet-cloud.config-app'
import { runPsql } from './cli/docker/runPsql'

export type SkeetCloudConfig = {
  app: AppConfig
  functions: FunctionConfig[]
  cloudArmor?: CloudArmor
}

export type AppConfig = {
  name: string
  projectId: string
  template: string
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

export const importConfig = async () => {
  try {
    const config = fs.readFileSync(`./skeet-cloud.config.json`)
    const json: SkeetCloudConfig = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const importFirebaseConfig = async () => {
  try {
    const config = fs.readFileSync(`./firebase.json`)
    const json = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const program = new Command()

program
  .name('skeet')
  .description('CLI for Skeet - Full-stack TypeScript Serverless framework')
  .version(VERSION)

Dotenv.config()

async function main() {
  // Please check the descriptions if they are correct.
  try {
    const docker = program.command('docker').description('docker commands')

    docker
      .command('psql')
      .description('docker psql container')
      .action(async () => {
        await runPsql()
      })

    program
      .command('create')
      .argument('<appName>', 'Name of the app')
      .description('Create Skeet Framework App')
      .action(async (appName: string) => {
        await create(appName)
      })
    program
      .command('server')
      .description('Run Skeet App')
      .alias('s')
      .action(server)
    program
      .command('deploy')
      .description('Deploy Skeet APP to Firebase')
      .action(deploy)
    program
      .command('init')
      .option('--only-dev', 'Skip Cloud Setup', false)
      .option('--only-config', 'Generate Skeet Cloud Config', false)
      .option('--load-balancer', 'Setup Cloud Load Balancer', false)
      .description('Initialize Google Cloud Setups for Skeet APP')
      .action(async (options) => {
        if (options.onlyConfig) {
          const data = await skeetCloudConfigAppGen()
          fs.writeFileSync(data.filePath, data.body)
        } else if (options.loadBalancer) {
          await initLb()
        } else {
          await init(options.onlyDev)
        }
      })

    const iam = program
      .command('iam')
      .description('Skeet IAM Comannd to setup Google Cloud Platform')
    iam
      .command('init')
      .description('Setup IAM for Google Cloud Platform')
      .action(async () => {
        await setupIam()
      })
    iam
      .command('pull')
      .description('Download IAM Key for Google Cloud Platform')
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
      .command('yarn')
      .description(
        'Skeet Yarn Comannd to run yarn command for multiple functions'
      )
      .argument(
        '<yarnCmd>',
        'Yarn Command - e.g. skeet yarn add -D @types/node'
      )
      .option('-p, --p <packageName>', 'npm package name', '')
      .option('-D', 'Dependency environment', false)
      .action(async (yarnCmd: string, options) => {
        if (yarnCmd === 'add' && options.p === '') {
          Logger.error('You need to define package name!')
          process.exit(1)
        }
        await yarn(yarnCmd, options.p, options.D)
      })
    const add = program
      .command('add')
      .description('Skeet Add Comannd to add new functions')
    add
      .command('functions')
      .argument('<functionsName>', 'Functions Name - e.g. openai')
      .action(async (functionsName: string) => {
        await addFunctions(functionsName)
      })
    add
      .command('method')
      .argument('<methodName>', 'Method Name - e.g. addStreamUserChat')
      .action(async (methodName: string) => {
        await addMethod(methodName)
      })
    add
      .command('model')
      .argument('<modelName>', 'Model Name - e.g. Article')
      .action(async (modelName: string) => {
        console.log(modelName)
        await addModel(modelName)
      })
    add
      .command('app')
      .argument(
        '<appDisplayName>',
        'Firebase App Display Name - e.g. skeet-web-console'
      )
      .action(async (appDisplayName: string) => {
        const { app } = await importConfig()
        await addFirebaseApp(app.projectId, appDisplayName)
      })
    add
      .command('secret')
      .argument('<secretKey>', 'Secret Key - e.g. API_KEY')
      .action(async (secretKey: string) => {
        await addSecret(secretKey)
      })
    add
      .command('webAppDomain')
      .option('-d, --domain <domain>', 'Web App Domain - e.g. skeet.dev', '')
      .option('-i, --ip <ip>', 'IP Address - e.g. 2.2.2.2', '')
      .action(async (options) => {
        await addWebAppDomain(options.domain, options.ip)
      })

    const sync = program
      .command('sync')
      .description('Skeet Sync Comannd to sync backend and frontend')
    sync
      .command('models')
      .description('Skeet Sync Models')
      .action(async () => {
        await syncModels()
      })
    sync
      .command('types')
      .description('Skeet Sync Types')
      .action(async () => {
        await syncTypes()
      })
    sync
      .command('routings')
      .description('Skeet Sync Routings')
      .action(async () => {
        await syncRoutings()
      })
    sync
      .command('armors')
      .description('Skeet Sync Cloud Armor Rules')
      .action(async () => {
        await syncArmors()
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
    program
      .command('login')
      .description('Skeet Login Command - Create Firebase Login Token')
      .option('--email [email]', 'Login Email', '')
      .option('--password [password]', 'Login Password', '')
      .action(async (options) => {
        if (options.email !== '') {
          await login(options.email, options.password)
        } else {
          await login()
        }
      })

    const get = program.command('get').description('Get Skeet App List')
    get
      .command('functions')
      .description('Show Skeet Functions List')
      .action(async () => {
        await listFunctions()
      })
    get
      .command('https')
      .description('Show Skeet Https List')
      .action(async () => {
        await listHttps()
      })
    get
      .command('dns')
      .description('Show Skeet NameServer Records')
      .action(async () => {
        const { app } = await importConfig()
        const res = await getZone(app.projectId, app.name)
        Logger.dnsSetupLog(res)
      })
    get
      .command('secret')
      .argument('<secretKey>', 'Secret Key - e.g. API_KEY')
      .description('Get Skeet Secret Value')
      .action(async (secretKey: string) => {
        await getSecret(secretKey)
      })

    program
      .command('curl')
      .description('Skeet Curl Command - Call Cloud Functions Endpoint for Dev')
      .argument(
        '<methodName>',
        'Method Name - e.g. skeet curl createUserChatRoom'
      )
      .option(
        '-d,--data [data]',
        'JSON Request Body - e.g. \'{ "model": "gpt4", "maxTokens": 420 }\''
      )
      .option('-r, --raw', 'Show chunk data', false)
      .option('-p, --production', 'For Production', false)
      .option(
        '-f,--functions [functions]',
        'For Production Functions Name',
        false
      )
      .action(async (methodName: string, options) => {
        const config = await importConfig()
        if (options.production) {
          if (!options.functions)
            throw new Error('Need to define functionsName')

          const functionsDomain = config.app.functionsDomain
          const curlOptions = {
            isProduction: options.production,
            functionsDomain,
            functionsName: options.functions,
            isRaw: options.raw,
          }
          await curl<Record<any, any>>(
            config.app.projectId,
            config.app.region,
            methodName,
            options.data,
            curlOptions
          )
        } else {
          const curlOptions = {
            isRaw: options.raw,
          }
          await curl<Record<any, any>>(
            config.app.projectId,
            config.app.region,
            methodName,
            options.data,
            curlOptions
          )
        }
      })
    program
      .command('test')
      .description('Skeet Jest Test Command')
      .action(async () => {
        await skeetTest()
      })

    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
