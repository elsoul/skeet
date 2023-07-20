import { graphqlMutation } from '@/templates/graphql'
import { Logger } from '@/lib'
import { writeFileSync } from 'fs'

export const genMutation = async (modelName: string) => {
  const fileInfo = await graphqlMutation(modelName)
  writeFileSync(fileInfo.filePath, fileInfo.body)
  Logger.success(`successfully created ✔ - ${fileInfo.filePath}`)
}
