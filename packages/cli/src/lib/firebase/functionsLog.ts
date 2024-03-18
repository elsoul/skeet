import { DEFAULT_FUNCTION_NAME } from '@/index'
import { execAsyncCmd, getFunctions } from '@/lib'
import { getExportedFunctions } from '@/lib/files/getExportedFunctions'
import inquirer from 'inquirer'
import { spawnSync } from 'node:child_process'

export const fuctionsLog = async (
  projectId: string,
  methodName?: string | null,
) => {
  if (methodName) {
    const shCmd = [
      'firebase',
      'functions:log',
      '--only',
      methodName,
      '-P',
      `${projectId}`,
    ]
    execAsyncCmd(shCmd)
    return
  }
  try {
    const functions = await getFunctions()
    let logFunctionName = { functionName: '' }
    if (functions.length > 1) {
      logFunctionName = await inquirer.prompt([
        {
          type: 'list',
          message: 'Select Function to show logs',
          name: 'functionName',
          choices: [new inquirer.Separator(' = Functions = '), ...functions],
          validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one function.'
            }

            return true
          },
        },
      ])
    } else {
      logFunctionName.functionName = DEFAULT_FUNCTION_NAME
    }
    const path = `${process.cwd()}/functions/${
      logFunctionName.functionName
    }/src/index.ts`
    const methods = await getExportedFunctions(path)
    if (methods.length === 0) {
      throw new Error(`fuctionsLog: No exported functions found in ${path}`)
    }

    const answer = await inquirer.prompt([
      {
        type: 'list',
        message: 'Select Functions to show logs',
        name: 'functions',
        choices: [new inquirer.Separator(' = Functions = '), ...methods],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one function.'
          }

          return true
        },
      },
    ])

    const shCmd = [
      'firebase',
      'functions:log',
      '--only',
      answer.functions,
      '-P',
      `${projectId}`,
    ]

    spawnSync(shCmd.join(' '), { stdio: 'inherit', shell: true })
  } catch (error) {
    throw new Error(`fuctionsLog: ${error}`)
  }
}
