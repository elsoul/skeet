import { GRAPHQL_PATH, PRISMA_SCHEMA_PATH } from '@/index'
import { readFileSync, writeFileSync } from 'fs'
import { convertFromKebabCaseToLowerCase } from '@/utils/string'
import { getPrismaPath } from '@/config/path'

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

export const getColType = (type: string) => {
  const param = prismaSchemaType.filter(
    (typeName) => type === typeName || type === typeName + '?',
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
  const enumCols = []
  for await (const model of modelCols) {
    if (model.type.match('Enum$')) {
      enumCols.push({ name: model.name, type: model.type })
    }
  }
  return enumCols
}

export const getEnums = async () => {
  const prismaSchema = readFileSync(PRISMA_SCHEMA_PATH)
  const splitSchema = String(prismaSchema).split(`enum `)
  splitSchema.shift()
  const enums: Array<string> = []
  for await (const line of splitSchema) {
    const enumName = line.match('(.+) {') || ''
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
      `export const ${convertFromKebabCaseToLowerCase(
        enumName,
      )}Enum = enumType(${enumName})`,
    )
  }
  writeFileSync(`${GRAPHQL_PATH}/enums.ts`, fileBody.join('\n'), {
    flag: 'w',
  })
}

export const getModels = (sqlName: string) => {
  const prismaPath = getPrismaPath(sqlName)
  const prismaSchema = readFileSync(prismaPath, 'utf-8')
  const lines = prismaSchema.split('\n')
  const models: Array<string> = []
  for (const line of lines) {
    if (line.includes('model') && line.includes('{')) {
      const modelName = line.split('model ')[1].replace(' {', '')
      models.push(modelName)
    }
  }
  return models
}

export const getColumns = (sqlName: string, modelName: string) => {
  const prismaPath = getPrismaPath(sqlName)
  const prismaSchema = readFileSync(prismaPath, 'utf-8')
  const lines = prismaSchema.split('\n')
  const modelSchema: Array<ModelSchema> = []
  let isModel = false
  let isEnd = false

  for (const line of lines) {
    if (isEnd) break
    if (isModel) {
      if (line.includes('}')) {
        isEnd = true
      } else {
        let splitArray = line.split(' ')
        splitArray = splitArray.filter((item) => item !== '')
        if (splitArray[0] == undefined) continue
        if (splitArray[0] == 'id') continue
        if (splitArray[0].includes('@@')) continue
        const getColTypeResult = getColType(splitArray[1])
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
    }
    if (line.includes(`model ${modelName}`) && line.includes('{')) {
      isModel = true
    }
  }
  return modelSchema
}
