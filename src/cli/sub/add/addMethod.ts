import { genInstanceMethod } from '@/templates/instanceTypes'
import inquirer from 'inquirer'
import {
  Logger,
  FUNCTIONS_PATH,
  functionsInstanceTypes,
  getFunctions,
} from '@/lib'
import { readFileSync, writeFileSync } from 'fs'

export const addMethod = async (methodName: string) => {
  try {
    const question = inquirer.prompt([
      {
        type: 'list',
        message: 'Select Instance Type to add',
        name: 'instanceType',
        choices: [
          new inquirer.Separator(' = Instance Type = '),
          ...functionsInstanceTypes,
        ],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one.'
          }

          return true
        },
      },
    ])
    await question.then(async (answer) => {
      const { instanceType } = answer
      const functions = await getFunctions()
      const whichFunctions = inquirer.prompt([
        {
          type: 'list',
          message: 'Select Functions to add',
          name: 'functions',
          choices: [new inquirer.Separator(' = Functions = '), ...functions],
          validate(functionsName) {
            if (functionsName.length < 1) {
              return 'You must choose at least one.'
            }
          },
        },
      ])
      await whichFunctions.then(async (functionsName) => {
        const genFile = await genInstanceMethod(
          instanceType,
          functionsName.functions,
          methodName
        )
        writeFileSync(genFile.filePath, genFile.body)
        Logger.successCheck(`${genFile.filePath} created`)
        const indexFile = `${FUNCTIONS_PATH}/${functionsName.functions}/src/index.ts`
        insertFunction(indexFile, methodName)
      })
    })

    return { status: 'success' }
  } catch (error) {
    throw new Error(`addMethod: ${error}`)
  }
}

const insertFunction = (filePath: string, functionName: string) => {
  try {
    const data = readFileSync(filePath, 'utf-8')
    let lines = data.split('\n')
    const targetLine = "} from '@/routings'"
    const insertionPoint = lines.findIndex((line) => line.includes(targetLine))

    if (insertionPoint === -1) {
      console.log(
        `Couldn't find the target line ("${targetLine}") in the file.`
      )
      return false
    }

    lines.splice(insertionPoint, 0, `  ${functionName},`)
    const newData = lines.join('\n')
    writeFileSync(filePath, newData, 'utf-8')
    Logger.successCheck(`Successfully exported to ${filePath}`)
    return true
  } catch (error) {
    throw new Error(`insertFunction: ${error}`)
  }
}
