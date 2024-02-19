import { Logger } from '@/lib/logger'
import { graphqlModel } from '@/templates/graphql'
import { writeFileSync } from 'fs'

export const genModel = async (modelName: string) => {
  const fileInfo = await graphqlModel(modelName)
  writeFileSync(fileInfo.filePath, fileInfo.body)
  Logger.successCheck(`successfully created ✔ - ${fileInfo.filePath}`)
}