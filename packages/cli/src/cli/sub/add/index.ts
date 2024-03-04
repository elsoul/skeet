import { DEFAULT_FUNCTION_NAME, program } from '@/index'
import { FUNCTIONS_PATH, importConfig } from '@/lib'
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
import { spawnSync } from 'child_process'
import { addGhActions } from './addGhActions'
import { genGithubActions } from '@/cli/gen'
import { addStripeWebhook } from './addStripeWebhook'
import { addTaskQueue } from './addTaskQueue'
import { addCloudSQL } from './addCloudSQL'

export const addSubCommands = async () => {
  const add = program
    .command('add')
    .description('Skeet Add Comannd to add new functions')
  add
    .command('functions')
    .argument('<functionsName>', 'Functions Name - e.g. skeet')
    .action(async (functionsName: string) => {
      await addFunctions(functionsName)
    })

  add
    .command('method')
    .option('--instance <instance>', 'Instance Type - e.g. http')
    .option('--function <function>', 'Function Name - e.g. skeet')
    .action(async (options: { function: string; instance: string }) => {
      const answer = await inquirer.prompt<{ methodName: string }>([
        {
          type: 'input',
          name: 'methodName',
          message: 'Enter Method Name',
          default: 'methodName',
        },
      ])
      const methodNameString = answer.methodName || 'methodName'
      if (options.function !== '' && options.instance !== '') {
        await addMethod(methodNameString, options.instance, options.function)
      } else {
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
      const config = await importConfig()
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
        const packageJsonPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/package.json`
        await addScriptToPackageJson(
          packageJsonPath,
          'discord:deploy',
          'npx ts-node -r tsconfig-paths/register --transpile-only src/lib/discord/deploy-commands.ts',
        )
        await addDependencyToPackageJson(
          packageJsonPath,
          '@skeet-framework/discord-utils',
          '0.2.13',
        )
        const cmd = `pnpm -F ${DEFAULT_FUNCTION_NAME}-func install`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      } else {
        const isDirExist = await addStripeWebhook()
        if (!isDirExist) {
          console.log(chalk.yellow('⚠️ Stripe Webhook already exists'))
          return
        }
        const packageJsonPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/package.json`
        await addDependencyToPackageJson(packageJsonPath, 'stripe', '14.4.0')
        const cmd = `pnpm -F ${DEFAULT_FUNCTION_NAME}-func install`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      }
    })

  add
    .command('taskQueue')
    .alias('tq')
    .argument('<queueName>', 'CloudTask Queue Name')
    .action(async (queueName: string) => {
      const { app } = await importConfig()
      await addTaskQueue(app.projectId, queueName, app.region)
    })
}
