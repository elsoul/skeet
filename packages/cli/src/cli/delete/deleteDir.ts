import { GRAPHQL_PATH } from '@/index'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { Logger } from '@/lib/logger'
import { rm } from 'fs/promises'

export const deleteDir = async (modelName: string) => {
  const filePath = GRAPHQL_PATH + '/' + modelName
  if (await checkFileDirExists(filePath)) {
    await rm(filePath, { recursive: true })
    Logger.success(`successfully deleted - ${filePath}`)
  } else {
    Logger.error(`File path doesn't exsit - ${filePath}`)
  }
}
