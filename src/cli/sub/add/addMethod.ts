import { genInstanceMethod } from '@/templates/instanceTypes'
import inquirer from 'inquirer'
import {
  Logger,
  FUNCTIONS_PATH,
  functionsInstanceTypes,
  getFunctions,
} from '@/lib'
import { readFileSync, writeFileSync } from 'fs'

export const addMethod = async (
  methodName: string,
  instanceType = '',
  functionName = '',
) => {
  try {
    const functions = getFunctions()
    if (instanceType !== '' && functionName !== '') {
      await genFunction(methodName, instanceType, functionName)
    } else {
      const question = await inquirer.prompt<{ instanceType: string }>(
        instanceTypeList(),
      )
      const instanceTypeValue = question.instanceType || ''

      if (functions.length === 1) {
        functionName = functions[0]
        await genFunction(methodName, instanceTypeValue, functionName)
      } else {
        const answer2 = await inquirer.prompt<{ functionName: string }>([
          {
            type: 'list',
            message: 'Select Functions to add',
            name: 'functionName',
            choices: [new inquirer.Separator(' = Functions = '), ...functions],
            validate(functionName) {
              if (functionName.length < 1) {
                return 'You must choose at least one.'
              }
            },
          },
        ])
        functionName = answer2.functionName || ''
        await genFunction(methodName, instanceTypeValue, functionName)
      }
    }
    return { status: 'success' }
  } catch (error) {
    throw new Error(`addMethod: ${error}`)
  }
}

export const insertFunction = (filePath: string, functionName: string) => {
  try {
    const data = readFileSync(filePath, 'utf-8')
    const lines = data.split('\n')
    const targetLine = "} from '@/routings'"
    const insertionPoint = lines.findIndex((line) => line.includes(targetLine))

    if (insertionPoint === -1) {
      console.log(
        `Couldn't find the target line ("${targetLine}") in the file.`,
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

const genFunction = async (
  methodName: string,
  instanceType: string,
  functionName: string,
) => {
  const genFile = await genInstanceMethod(
    instanceType,
    functionName,
    methodName,
  )
  writeFileSync(genFile.filePath, genFile.body)
  Logger.successCheck(`${genFile.filePath} created`)
  const indexFile = `${FUNCTIONS_PATH}/${functionName}/src/index.ts`
  insertFunction(indexFile, methodName)
}

export const instanceTypeList = () => {
  return [
    {
      type: 'list',
      message: 'Select Instance Type to add',
      name: 'instanceType',
      choices: [
        new inquirer.Separator(' = Instance Type = '),
        ...functionsInstanceTypes,
      ],
      validate(answer: string) {
        if (answer.length < 1) {
          return 'You must choose at least one.'
        }

        return true
      },
    },
  ]
}
