import { DEFAULT_FUNCTION_NAME } from '@/index'
import { getExportedFunctions } from '@/lib/files/getExportedFunctions'
import { spawnSync } from 'child_process'
import inquirer from 'inquirer'

export const firebaseFunctionsDeploy = async (
  projectId: string,
  functionName: string = DEFAULT_FUNCTION_NAME,
  functionPath?: string | null,
) => {
  if (functionPath) {
    const shCmd = [
      'firebase',
      'deploy',
      '--only',
      functionPath,
      '-P',
      `${projectId}`,
    ]
    spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
    return true
  }
  try {
    const path = `./functions/${functionName}/src/index.ts`
    const methods = await getExportedFunctions(path)
    if (methods.length === 0) {
      throw new Error(
        `firebaseFunctionsDeploy: No exported functions found in ${path}`,
      )
    }
    const answer = await inquirer.prompt<{ functions: Array<string> }>([
      {
        type: 'checkbox',
        message: 'Select Functions to deploy',
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
    let functions = ''
    let i = 0
    for await (const method of answer.functions) {
      if (i === answer.functions.length - 1) {
        functions += `functions:${functionName}:${method}`
        i++
      } else {
        functions += `functions:${functionName}:${method},`
        i++
      }
    }

    const shCmd = [
      'firebase',
      'deploy',
      '--only',
      functions,
      '-P',
      `${projectId}`,
    ]
    // spawn and write logs to console from child process
    spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
    return true
  } catch (error) {
    throw new Error(`firebaseFunctionsDeploy: ${error}`)
  }
}
