import { getColumns, getEnumCols, ModelSchema } from '@/lib'
import { GRAPHQL_PATH } from '@/index'
import { toLowerCase } from '@/utils/string'

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
  enumArray: Array<string>,
) => {
  const lowerEnum = enumArray.map((enumName) => toLowerCase(enumName))
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
  const modelCols: ModelSchemaArray = getColumns('', modelName)
  const enumNames = await getEnumCols(modelCols)
  let importArray = []
  const modelCodeArray = [
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

  const enumParams = []
  for await (const model of modelCols) {
    if (model.type.match('Enum$')) {
      const addLine = `    t.field(${modelName}.${
        model.name
      }.name, { type: ${toLowerCase(model.type)} })`
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
