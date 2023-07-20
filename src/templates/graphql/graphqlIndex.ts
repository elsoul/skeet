import { GRAPHQL_PATH } from '@/index'

export const graphqlIndex = async (modelName: string) => {
  const filePath = GRAPHQL_PATH + '/modelManager/' + modelName + '/index.ts'
  const body = `export * from './model'
export * from './query'
export * from './mutation'
`
  return {
    filePath,
    body,
  }
}
