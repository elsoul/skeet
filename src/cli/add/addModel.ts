import { functionsInstanceTypes, getFunctions } from '@/lib/getDirs'
import { genInstanceMethod } from '@/templates/instanceTypes'
import inquirer from 'inquirer'
import fs from 'fs'
import { Logger } from '@/lib/logger'
import { genModel } from './genModel'

export const addModel = async (modelName: string) => {
  try {
    const functions = await getFunctions(true)
    const question = inquirer.prompt([
      {
        type: 'list',
        message: 'Select Functions to add',
        name: 'functionName',
        choices: [
          new inquirer.Separator(' = Instance Type = '),
          ...functions.map((functionName) => ({
            name: functionName,
          })),
        ],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one.'
          }
        },
      },
    ])
    await question.then(async (answer) => {
      const { functionName } = answer
      genModel(functionName, modelName)
    })
    return true
  } catch (error) {
    throw new Error(`addMethod: ${error}`)
  }
}
