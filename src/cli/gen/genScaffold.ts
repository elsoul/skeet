import { GRAPHQL_PATH, PRISMA_SCHEMA_PATH } from '@/index'
import { Logger, syncEnumFile } from '@/lib'
import * as Skeet from '.'
import { readFileSync, readdirSync, writeFileSync } from 'fs'

export const genScaffoldAll = async () => {
  const newModels = await getNewModels()
  await syncEnumFile()
  for await (const modelName of newModels) {
    await genScaffold(modelName)
  }
  await genGraphqlIndex()
  await genmodelManagerIndex()
}

export const genScaffold = async (modelName: string) => {
  await Skeet.genDir(modelName)
  await Skeet.genMutation(modelName)
  await Skeet.genModel(modelName)
  await Skeet.genQuery(modelName)
  await Skeet.genIndex(modelName)
}

export const genGraphqlIndex = async () => {
  let exportArray = [
    `export * from './taskManager'`,
    `export * from './modelManager'`,
    `export * from './authManager'`,
    `export * from './responseManager'`,
  ]

  const filePath = GRAPHQL_PATH + '/index.ts'
  writeFileSync(filePath, exportArray.join('\n'), { flag: 'w' })
  Logger.success(`successfully created ✔ - ${filePath}`)
}

export const genmodelManagerIndex = async () => {
  const apiModels = await getApiModels()
  let exportArray: Array<string> = []
  for await (const model of apiModels) {
    const str = `export * from './${model}'`
    exportArray.push(str)
  }
  const filePath = GRAPHQL_PATH + '/modelManager/index.ts'
  writeFileSync(filePath, exportArray.join('\n'), { flag: 'w' })
  Logger.success(`successfully created ✔ - ${filePath}`)
}

export const getNewModels = async () => {
  const apiModels = await getApiModels()
  const prismaModels = await getPrismaModels()
  const newMoldes = prismaModels.filter((x) => apiModels.indexOf(x) === -1)
  return newMoldes
}

export const getApiModels = async () => {
  const apiModels = readdirSync(GRAPHQL_PATH + '/modelManager/', {
    withFileTypes: true,
  })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)

  return apiModels
}

export const getPrismaModels = async () => {
  const prismaSchema = readFileSync(PRISMA_SCHEMA_PATH)
  let splitSchema = String(prismaSchema).split('model ')
  splitSchema.shift()
  let modelNames: Array<string> = []
  for await (const line of splitSchema) {
    const firstLine = line.split('\n')[0]
    const modelName = firstLine.replace(' {', '')
    modelNames.push(modelName)
  }
  return modelNames
}
