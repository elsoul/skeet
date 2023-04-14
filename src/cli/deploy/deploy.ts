import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctions } from '@/lib/getSkeetConfig'
import inquirer from 'inquirer'

export const deploy = async () => {
  const functions = await getFunctions()
  const functionsArray: Array<{ [key: string]: string }> = []
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
          const yarnBuild = ['yarn', '--cwd', `functions/${service}`, 'build']
          await execSyncCmd(yarnBuild)
          const shCmd = ['firebase', 'deploy', '--only', `functions:${service}`]
          await execSyncCmd(shCmd)
        })
      }
      return true
    })
}
