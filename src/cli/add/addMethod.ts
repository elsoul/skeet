import { functionsInstanceTypes, getFunctions } from '@/lib/getDirs'
import { genInstanceMethod } from '@/templates/instanceTypes'
import inquirer from 'inquirer'
import fs from 'fs'
import { Logger } from '@/lib/logger'

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
        fs.writeFileSync(genFile.filePath, genFile.body)
        Logger.success(`✔️ ${genFile.filePath} created!`)
      })
    })

    return { status: 'success' }
  } catch (error) {
    throw new Error(`addMethod: ${error}`)
  }
}
