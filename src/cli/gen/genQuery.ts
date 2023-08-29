import { graphqlQuery } from '@/templates/graphql'
import { Logger } from '@/lib/logger'
import { writeFileSync } from 'fs'

export const genQuery = async (modelName: string) => {
  const fileInfo = await graphqlQuery(modelName)
  writeFileSync(fileInfo.filePath, fileInfo.body)
  Logger.successCheck(`successfully created ✔ - ${fileInfo.filePath}`)
}
