import { graphqlIndex } from '@/templates/graphql'
import { Logger } from '@/lib'
import { writeFileSync } from 'fs'

export const genIndex = async (modelName: string) => {
  const fileInfo = await graphqlIndex(modelName)
  writeFileSync(fileInfo.filePath, fileInfo.body)
  Logger.success(`successfully created - ${fileInfo.filePath}`)
}
