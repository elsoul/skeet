import inquirer from 'inquirer'
import { importConfig, getFunctions } from '@/lib'
import { deployWebApp } from './deployWebApp'
import { deployRules } from './deployRules'
import { firebaseFunctionsDeploy } from './firebaseDeploy'
import { yarnBuild } from '../yarn/yarnBuild'
import { deployGraphql } from './deployGraphql'

export const deploy = async () => {
  const functions = await getFunctions()
  const functionsArray: Array<{ [key: string]: string }> = [
    { name: 'graphql' },
    { name: 'webApp' },
  ]
  for await (const functionName of functions) {
    functionsArray.push({ name: functionName })
  }
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select Services to run functions command',
        name: 'functions',
        choices: [new inquirer.Separator(' = Services = '), ...functionsArray],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one service.'
          }

          return true
        },
      },
    ])
    .then(async (answers: { functions: Array<string> }) => {
      if (answers.functions) {
        answers.functions.forEach(async (service) => {
          const config = await importConfig()
          if (service === 'webApp') {
            await deployWebApp()
            await deployRules(config.app.projectId)
          } else if (service === 'graphql') {
            await deployGraphql(config)
          } else {
            await yarnBuild(service)
            await firebaseFunctionsDeploy(config.app.projectId, service)
          }
        })
      }

      return true
    })
}
