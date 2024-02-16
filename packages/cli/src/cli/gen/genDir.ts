import { GRAPHQL_PATH } from '@/index'
import { mkdirSync } from 'fs'

export const genDir = async (modelName: string) => {
  const fileDir = GRAPHQL_PATH + '/modelManager/' + modelName
  mkdirSync(fileDir, { recursive: true })
}
