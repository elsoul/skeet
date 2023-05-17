import { copyFileWithOverwrite } from '@/lib/copyFiles'
import { getModelFiles } from '@/lib/getModelFiles'
import { Logger } from '@/lib/logger'
import fs from 'fs'
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
        Logger.warning(`Warning: Is this really the latest model? 🤔`)
        return false
      }

      const oldModels = models.slice(1)
      Logger.success(`latestModel: ${latestModel.functionName}`)
      for await (const model of models) {
        await Logger.sync(`Syncing ${model.functionName}...`)
        if (model.functionName === latestModel.functionName) continue
        for await (const latestModelPath of latestModel.modelsPath) {
          const latestModelFileName = latestModelPath.split('/').pop()
          for await (const functionData of oldModels) {
            const modelPath = `functions/${functionData.functionName}/src/models/${latestModelFileName}`
            console.log(`Copying ${latestModelPath} to ${modelPath}`)
            await copyFileWithOverwrite(latestModelPath, modelPath)
          }
          const frontModelPath = `src/types/models/${latestModelFileName}`
          if (fs.existsSync('src/types/models')) {
            fs.mkdirSync('src/types/models', { recursive: true })
          }
          console.log(`Copying ${latestModelPath} to ${frontModelPath}`)
          await copyFileWithOverwrite(latestModelPath, frontModelPath)
        }
      }
      await Logger.sync('Synced Models Types 🎉')
      return true
    })
}
