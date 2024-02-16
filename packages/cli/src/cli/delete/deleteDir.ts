import { GRAPHQL_PATH } from '@/index'
import { Logger } from '@/lib/logger'
import { existsSync, rmSync } from 'fs'

export const deleteDir = async (modelName: string) => {
  const filePath = GRAPHQL_PATH + '/' + modelName
  if (existsSync(filePath)) {
    rmSync(filePath, { recursive: true })
    Logger.success(`successfully deleted - ${filePath}`)
  } else {
    Logger.error(`File path doesn't exsit - ${filePath}`)
  }
}
