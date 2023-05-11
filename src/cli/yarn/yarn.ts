import { execSyncCmd } from '@/lib/execSyncCmd'
import inquirer from 'inquirer'
import { FUNCTIONS_PATH, getFunctions } from '@/lib/getSkeetConfig'

export type YarnService = {
  yarn: Array<string>
}

export enum YarnCmd {
  DEV = 'dev',
  INSTALL = 'install',
  BUILD = 'build',
  START = 'start',
  ADD = 'add',
}

export const yarn = async (
  yarnCmd: string,
  packageName: string = '',
  isDev: boolean = false
) => {
  const functions = await getFunctions()
  const functionsArray: Array<{ [key: string]: string }> = []
  for await (const functionName of functions) {
    functionsArray.push({ name: functionName })
  }
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select Services to run yarn command',
        name: 'yarn',
        choices: [new inquirer.Separator(' = Services = '), ...functionsArray],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one service.'
          }

          return true
        },
      },
    ])
    .then(async (answers: YarnService) => {
      if (answers.yarn) {
        answers.yarn.forEach(async (service) => {
          await yarnCmdRun(service, yarnCmd, packageName, isDev)
        })
      }
      return true
    })
}

export const yarnCmdRun = async (
  functionName: string,
  yarnCmd: string,
  packageName: string = '',
  isDev: boolean = false
) => {
  let shCmd: Array<string> = []
  switch (yarnCmd) {
    case 'add':
      shCmd = await getYarnShCmd(functionName, yarnCmd, packageName, isDev)
      break
    default:
      shCmd = await getYarnShCmd(functionName, yarnCmd)
      break
  }
  execSyncCmd(shCmd)
}

const getYarnShCmd = async (
  functionName: string = '',
  yarnCmd: string,
  packageName: string = '',
  isDev: boolean = false
) => {
  let shCmd = []
  switch (functionName) {
    default:
      shCmd = ['yarn', '--cwd', `${FUNCTIONS_PATH}/${functionName}`, yarnCmd]
      break
  }
  if (packageName !== '' && isDev) {
    shCmd.push('-D', packageName)
  } else if (packageName !== '' && isDev === false) {
    shCmd.push(packageName)
  }
  return shCmd
}
