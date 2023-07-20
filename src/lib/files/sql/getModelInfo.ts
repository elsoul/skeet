import { Logger } from '@/lib/logger'
import { GRAPHQL_PATH, PRISMA_SCHEMA_PATH } from '@/index'
import { toLowerCase } from '@skeet-framework/utils'
import { readFileSync, writeFileSync } from 'fs'

export type ModelSchema = {
  name: string
  type: string
}

export const prismaSchemaType = [
  'ID',
  'String',
  'Int',
  'Float',
  'DateTime',
  'Boolean',
  'Bytes',
]

export enum ColType {
  Enum,
  Relation,
  Normal,
  Bytes,
}

export const getColType = async (type: string) => {
  let param = prismaSchemaType.filter(
    (typeName) => type === typeName || type === typeName + '?'
  )
  if (param.length == 0) {
    if (type.includes('?') || type.includes('[]')) {
      return ColType.Relation
    } else {
      return ColType.Enum
    }
  } else if (type === 'Bytes') {
    return ColType.Bytes
  } else {
    return ColType.Normal
  }
}

export const getEnumCols = async (modelCols: Array<ModelSchema>) => {
  let enumCols = []
  for await (const model of modelCols) {
    if (model.type.match('Enum$')) {
      enumCols.push({ name: model.name, type: model.type })
    }
  }
  return enumCols
}

export const getEnums = async () => {
  const prismaSchema = readFileSync(PRISMA_SCHEMA_PATH)
  let splitSchema = String(prismaSchema).split(`enum `)
  splitSchema.shift()
  let enums: Array<string> = []
  for await (const line of splitSchema) {
    let enumName = line.match('(.+) {') || ''
    enums.push(enumName[1])
  }
  return enums
}

export const syncEnumFile = async () => {
  const enums = await getEnums()
  const fileBody = [
    `import { enumType } from 'nexus'`,
    `import { ${enums.join(', ')} } from 'nexus-prisma'\n`,
  ]
  for await (const enumName of enums) {
    fileBody.push(
      `export const ${await toLowerCase(enumName)}Enum = enumType(${enumName})`
    )
  }
  writeFileSync(`${GRAPHQL_PATH}/enums.ts`, fileBody.join('\n'), {
    flag: 'w',
  })
}

export const getModelCols = async (modelName: string) => {
  try {
    const prismaSchema = readFileSync(PRISMA_SCHEMA_PATH)
    let splitSchema = String(prismaSchema).split(`model `)
    splitSchema = splitSchema.filter((model) => model.match(`\^${modelName} `))
    let modelCols = splitSchema[0].split('\n')
    let schemaArray: Array<string> = []
    for await (const line of modelCols) {
      if (line !== '' && !line.includes(' {') && !line.includes('}')) {
        schemaArray.push(line)
      } else if (line === '}') {
        break
      }
    }
    let modelSchema: Array<ModelSchema> = []
    for await (const line of schemaArray) {
      let splitArray = line.split(' ')
      splitArray = splitArray.filter((item) => item !== '')
      if (splitArray[0] == 'id') continue
      if (splitArray[0].includes('@@')) continue

      let getColTypeResult = await getColType(splitArray[1])
      if (getColTypeResult === ColType.Bytes) continue
      const type =
        getColTypeResult === ColType.Enum
          ? `${splitArray[1]}Enum`
          : splitArray[1]

      if (splitArray[2]) {
        if (splitArray[2].includes('@relation')) {
        } else {
          modelSchema.push({
            name: splitArray[0],
            type,
          })
        }
      } else {
        modelSchema.push({
          name: splitArray[0],
          type,
        })
      }
    }
    return modelSchema
  } catch (error) {
    let errorMsg = `error: can't find ${modelName}`
    Logger.error(errorMsg)
    return []
  }
}
