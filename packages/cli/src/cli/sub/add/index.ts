import { DEFAULT_FUNCTION_NAME, program } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { addFunctions } from './addFunctions'
import { addMethod } from './addMethod'
import { addModel } from './addModel'
import { addFirebaseApp } from './addFirebaseApp'
import { addSecret } from './addSecret'
import { addWebAppDomain } from './addWebAppDomain'
import { addIp } from './addIp'
import { addGithubEnv } from './addGithubEnv'
import chalk from 'chalk'
import { addScriptToPackageJson } from '@/lib/files/addScriptToPackageJson'
import { addDiscordWebhook } from './addDiscordWebhook'
import { addDependencyToPackageJson } from '@/lib/files/addDependencyToPackageJson'
import inquirer from 'inquirer'
import { spawnSync } from 'node:child_process'
import { addGhActions } from './addGhActions'
import { genGithubActions } from '@/cli/gen'
import { addStripeWebhook } from './addStripeWebhook'
import { addTaskQueue } from './addTaskQueue'
import { addCloudSQL } from './addCloudSQL'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { firebaseAddSecret } from '@/lib/firebase/firebaseAddSecret'

type AddMethodOptions = {
  instance: string
  function: string
  methodName: string
}

export const addSubCommands = async () => {
  const add = program
    .command('add')
    .description('Skeet Add Comannd to add new functions')

  add
    .command('functions')
    .alias('func')
    .option('--functionsName <functionsName>', 'Function Name - e.g. skeet', '')
    .action(async (options: { functionsName: string }) => {
      if (options.functionsName !== '') {
        await addFunctions(options.functionsName)
        return
      }
      const answer = await inquirer.prompt<{ functionsName: string }>([
        {
          type: 'input',
          name: 'functionsName',
          message: 'Enter Function Name',
          default: 'solana',
        },
      ])
      await addFunctions(answer.functionsName)
    })

  add
    .command('method')
    .option('--instance <instance>', 'Instance Type - e.g. http')
    .option('--function <function>', 'Function Name - e.g. skeet')
    .option('--methodName <methodName>', 'Method Name - e.g. methodName')
    .action(async (options: AddMethodOptions) => {
      if (
        options.function != null &&
        options.instance != null &&
        options.methodName != null
      ) {
        await addMethod(options.methodName, options.instance, options.function)
      } else {
        const answer = await inquirer.prompt<{ methodName: string }>([
          {
            type: 'input',
            name: 'methodName',
            message: 'Enter Method Name',
            default: 'methodName',
          },
        ])
        const methodNameString = answer.methodName || 'methodName'
        await addMethod(methodNameString)
      }
    })
  add
    .command('model')
    .argument('<modelName>', 'Model Name - e.g. Article')
    .action(async (modelName: string) => {
      await addModel(modelName)
    })
  add
    .command('app')
    .argument(
      '<appDisplayName>',
      'Firebase App Display Name - e.g. skeet-web-console',
    )
    .action(async (appDisplayName: string) => {
      const { app } = await readOrCreateConfig()
      await addFirebaseApp(app.projectId, appDisplayName)
    })

  add.command('secret').action(async () => {
    const answer = await inquirer.prompt<{
      secretKey: string
      secretValue: string
    }>([
      {
        type: 'input',
        name: 'secretKey',
        message: 'Enter Secret Key',
        default: 'API_KEY',
      },
      {
        type: 'password',
        name: 'secretValue',
        message: 'Enter Secret Value',
        mask: '*',
        default: 'API_KEY_VALUE',
      },
    ])
    await firebaseAddSecret(answer.secretKey, answer.secretValue)
  })

  add
    .command('ghSecret')
    .argument('<secretKey>', 'Secret Key - e.g. API_KEY')
    .action(async (secretKey: string) => {
      await addGithubEnv(secretKey)
    })

  add
    .command('ghActions')
    .description('Add Github Actions')
    .action(async () => {
      console.log(chalk.blue(`👷 Creating Github Repository...`))
      await genGithubActions()
      await addGhActions()
      console.log(chalk.green(`✅ Github Repository/Actions Created`))
    })

  add
    .command('webAppDomain')
    .option('-d, --domain <domain>', 'Web App Domain - e.g. skeet.dev', '')
    .option('-i, --ip <ip>', 'IP Address - e.g. 2.2.2.2', '')
    .action(async (options) => {
      await addWebAppDomain(options.domain, options.ip)
    })
  add.command('ip').action(async () => {
    await addIp()
  })

  add
    .command('sql')
    .alias('SQL')
    .description('Add Cloud SQL')
    .action(async () => {
      const config = await readOrCreateConfig()
      await addCloudSQL(config)
    })

  add
    .command('webhook')
    .alias('webHook')
    .alias('wh')
    .description('Add Webhook Endpoint')
    .action(async () => {
      const webhookType = await inquirer.prompt<{ webhookType: string }>([
        {
          type: 'list',
          name: 'webhookType',
          message: 'Select Webhook Type',
          choices: ['discord', 'stripe'],
        },
      ])
      if (webhookType.webhookType === 'discord') {
        const isDirExist = await addDiscordWebhook()
        if (!isDirExist) {
          console.log(chalk.yellow('⚠️ Discord Webhook already exists'))
          return
        }
        const packageJsonPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}-func/package.json`
        await addScriptToPackageJson(
          packageJsonPath,
          'discord:deploy',
          'npx ts-node -r tsconfig-paths/register --transpile-only src/lib/discord/deploy-commands.ts',
        )
        await addDependencyToPackageJson(
          packageJsonPath,
          '@skeet-framework/discord-utils',
          '0.4.2',
        )
        const cmd = `pnpm -F ${DEFAULT_FUNCTION_NAME}-func install`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      } else {
        const isDirExist = await addStripeWebhook()
        if (!isDirExist) {
          console.log(chalk.yellow('⚠️ Stripe Webhook already exists'))
          return
        }
        const packageJsonPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}-func/package.json`
        await addDependencyToPackageJson(packageJsonPath, 'stripe', '14.4.0')
        const cmd = `pnpm -F ${DEFAULT_FUNCTION_NAME}-func install`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      }
    })

  add
    .command('taskQueue')
    .alias('tq')
    .description('Add Cloud Task Queue')
    .action(async () => {
      const answer = await inquirer.prompt<{
        queueName: string
      }>([
        {
          type: 'input',
          name: 'queueName',
          message: 'Enter Task Queue Name',
          default: 'check-validator',
        },
      ])
      const { app } = await readOrCreateConfig()
      await addTaskQueue(app.projectId, answer.queueName, app.region)
    })
}
