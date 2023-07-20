import { copyFileWithOverwrite } from '@/lib/copyFiles'
import { getModelFiles } from '@/lib/getModelFiles'
import { Logger } from '@/lib/logger'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'

export const syncModels = async () => {
  const models = await getModelFiles()
  const latestModel = models[0]
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select Original Copy of Model',
        name: 'model',
        choices: [
          new inquirer.Separator(' = Models = '),
          ...models.map((model) => model.functionName),
        ],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one service.'
          }
          return true
        },
      },
    ])
    .then(async (answer) => {
      if (answer.model !== latestModel.functionName) {
        Logger.warning(`⚠️ Warning: Is this really the latest model? 🤔`)
        return false
      }

      const oldModels = models.slice(1)
      Logger.normal(`latestModel: ${latestModel.functionName}`)
      for await (const model of models) {
        for await (const latestModelPath of latestModel.modelsPath) {
          const latestModelFileName = latestModelPath.split('/').pop() || ''
          await copyToFrontend(latestModelFileName, latestModelPath)
          if (model.functionName === latestModel.functionName) continue

          for await (const functionData of oldModels) {
            const modelPath = `functions/${functionData.functionName}/src/models/${latestModelFileName}`
            await copyFileWithOverwrite(latestModelPath, modelPath)
          }
        }
      }
      Logger.successCheck('Successfully Synced Models')
      return true
    })
}

const copyToFrontend = async (
  latestModelFileName: string,
  latestModelPath: string
) => {
  const frontModelPath = `src/types/models/${latestModelFileName}`
  if (existsSync('src/types/models')) {
    mkdirSync('src/types/models', { recursive: true })
  }
  await copyFileWithOverwrite(latestModelPath, frontModelPath)
}
