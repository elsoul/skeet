import { program } from '@/index'
import { importConfig } from '@/lib'
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
}
