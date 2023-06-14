import { getFunctions } from '@/lib/getDirs'
import inquirer from 'inquirer'
import {
  yarnBuild,
  deployWebApp,
  deployRules,
  firebaseFunctionsDeploy,
} from '@/cli'
import { importConfig } from '@/index'

export const deploy = async () => {
  const functions = await getFunctions()
  const functionsArray: Array<{ [key: string]: string }> = [{ name: 'webApp' }]
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
          } else {
            await yarnBuild(service)
            await firebaseFunctionsDeploy(config.app.projectId, service)
          }
        })
      }

      return true
    })
}
