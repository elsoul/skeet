import { getEnumCols, getModelCols, ModelSchema } from '@/lib'
import { toLowerCase } from '@skeet-framework/utils'
import { GRAPHQL_PATH } from '@/index'

export type ModelSchemaArray = Array<ModelSchema>

export const graphqlModel = async (modelName: string) => {
  const filePath = GRAPHQL_PATH + '/modelManager/' + modelName + '/model.ts'
  const body = (await modelCodes(modelName)).join('\n')
  return {
    filePath,
    body,
  }
}

export const enumImport = async (
  modelName: string,
  enumArray: Array<string>
) => {
  const lowerEnum = []
  for await (const enumName of enumArray) {
    lowerEnum.push(`${await toLowerCase(enumName)}`)
  }
  const enumString = lowerEnum.join(', ')
  const body = [
    `import { objectType } from 'nexus'`,
    `import { ${modelName} } from 'nexus-prisma'`,
    `import { ${enumString} } from '../../enums'\n`,
  ]
  return body
}

export const normalImport = async (modelName: string) => {
  const body = [
    `import { objectType } from 'nexus'`,
    `import { ${modelName} } from 'nexus-prisma'\n`,
  ]
  return body
}

export const modelCodes = async (modelName: string) => {
  const modelCols: ModelSchemaArray = await getModelCols(modelName)
  const enumNames = await getEnumCols(modelCols)
  let importArray = []
  let modelCodeArray = [
    `export const ${modelName}Object = objectType({`,
    `  name: ${modelName}.$name,`,
    `  description: ${modelName}.$description,`,
    `  definition(t) {`,
    `    t.relayGlobalId('id', {})`,
  ]

  if (enumNames.length === 0) {
    importArray = await normalImport(modelName)
    for await (const importString of importArray.reverse()) {
      modelCodeArray.unshift(importString)
    }
  } else {
    const modelEnums = []
    for await (const data of enumNames) {
      if (data.type.match('Enum$')) {
        modelEnums.push(data.type)
      }
    }
    const enumBox = Array.from(new Set(modelEnums))
    importArray = await enumImport(modelName, enumBox)

    for await (const importString of importArray.reverse()) {
      modelCodeArray.unshift(importString)
    }
  }

  let enumParams = []
  for await (const model of modelCols) {
    if (model.type.match('Enum$')) {
      const addLine = `    t.field(${modelName}.${
        model.name
      }.name, { type: ${await toLowerCase(model.type)} })`
      modelCodeArray.push(addLine)
      enumParams.push(model.name)
    } else {
      const addLine = `    t.field(${modelName}.${model.name})`
      modelCodeArray.push(addLine)
    }
  }

  modelCodeArray.push('  },', '})')

  return modelCodeArray
}
