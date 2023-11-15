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
import { addGraphQL } from './addGraphQL'
import { addScriptToPackageJson } from '@/lib/files/addScriptToPackageJson'
import { addDiscordWebhook } from './addDiscordWebhook'
import { addDependencyToPackageJson } from '@/lib/files/addDependencyToPackageJson'
import inquirer from 'inquirer'
import { spawnSync } from 'child_process'
import { addGhActions } from './addGhActions'
import { genGithubActions } from '@/cli/gen'
import { addStripeWebhook } from './addStripeWebhook'

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
    .argument('<methodName>', 'Method Name - e.g. addStreamUserChat')
    .option('--instance <instance>', 'Instance Type - e.g. http')
    .option('--function <function>', 'Function Name - e.g. skeet')
    .action(
      async (
        methodName: string,
        options: { function: string; instance: string },
      ) => {
        if (options.function !== '' && options.instance !== '') {
          await addMethod(methodName, options.instance, options.function)
        } else {
          await addMethod(methodName)
        }
      },
    )
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
      'Firebase App Display Name - e.g. skeet-web-console',
    )
    .action(async (appDisplayName: string) => {
      const { app } = importConfig()
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
      addGhActions()
      await genGithubActions()
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
    .command('graphql')
    .alias('graphQL')
    .description('Add GraphQL')
    .action(async () => {
      await addGraphQL()
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
        const isDirExist = addDiscordWebhook()
        if (!isDirExist) {
          console.log(chalk.yellow('⚠️ Discord Webhook already exists'))
          return
        }
        const packageJsonPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/package.json`
        addScriptToPackageJson(
          packageJsonPath,
          'discord:deploy',
          'npx ts-node -r tsconfig-paths/register --transpile-only src/lib/discord/deploy-commands.ts',
        )
        addDependencyToPackageJson(
          packageJsonPath,
          '@skeet-framework/discord-utils',
          '0.2.13',
        )
        const cmd = `yarn --cwd ${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME} install`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      } else {
        const isDirExist = addStripeWebhook()
        if (!isDirExist) {
          console.log(chalk.yellow('⚠️ Stripe Webhook already exists'))
          return
        }
        const packageJsonPath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/package.json`
        addDependencyToPackageJson(packageJsonPath, 'stripe', '14.4.0')
        const cmd = `yarn --cwd ${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME} install`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
      }
    })
}
