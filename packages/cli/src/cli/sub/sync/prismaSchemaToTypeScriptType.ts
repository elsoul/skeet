import { Logger } from '@/lib'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { mkdir, readFile, writeFile } from 'fs/promises'

export type PrismaModel = {
  name: string
  fields: Array<{ name: string; type: string; isOptional: boolean }>
}

export const writePrismaSchemaToFunctions = async (modelPath: string) => {
  try {
    const sqlName = modelPath.split('/')[2]
    const yourPrismaSchemaHere = await readFile(modelPath, 'utf-8')
    const commonSqlDir = './common/sql/'
    if (!(await checkFileDirExists(commonSqlDir))) {
      await mkdir(commonSqlDir, { recursive: true })
    }
    const tsTypes = prismaSchemaToTypeScriptTypes(yourPrismaSchemaHere)
    const outDir = `${commonSqlDir}${sqlName}`
    if (!(await checkFileDirExists(outDir))) {
      await mkdir(outDir, { recursive: true })
    }
    const outputPath = `${outDir}/prismaSchema.ts`
    await writeFile(outputPath, tsTypes)
    Logger.successCheck(
      `Converted prisma.schema to Common Type - ${outputPath}`,
    )
  } catch (error) {
    throw new Error(`Error writing Prisma schema to functions: ${error}`)
  }
}

export function prismaSchemaToTypeScriptTypes(prismaSchema: string): string {
  const models: PrismaModel[] = []
  const enums: { name: string; values: string[] }[] = []

  const lines = prismaSchema.split('\n')
  let currentModel: PrismaModel | null = null
  let currentEnum: { name: string; values: string[] } | null = null

  for (const line of lines) {
    const modelMatch = line.match(/^model (\w+) \{$/)
    const enumMatch = line.match(/^enum (\w+) \{$/)

    if (modelMatch) {
      currentModel = { name: modelMatch[1], fields: [] }
      models.push(currentModel)
      continue
    }

    if (enumMatch) {
      currentEnum = { name: enumMatch[1], values: [] }
      enums.push(currentEnum)
      continue
    }

    if (line.includes('}')) {
      currentModel = null
      currentEnum = null
      continue
    }

    if (currentModel) {
      const fieldMatch = line.match(/(\w+)\s+(\w+)(\?)?/)
      if (fieldMatch) {
        currentModel.fields.push({
          name: fieldMatch[1],
          type: fieldMatch[2],
          isOptional: !!fieldMatch[3],
        })
      }
    }

    if (currentEnum) {
      const enumValueMatch = line.match(/(\w+)/)
      if (enumValueMatch) {
        currentEnum.values.push(enumValueMatch[1])
      }
    }
  }

  let output = "import { Timestamp } from 'firebase-admin/firestore'\n\n"

  for (const enumObj of enums) {
    output += `export enum ${enumObj.name} {\n`
    for (const value of enumObj.values) {
      output += `  ${value},\n`
    }
    output += '}\n\n'
  }

  for (const model of models) {
    output += `export type ${model.name} = {\n`
    for (const field of model.fields) {
      const tsType = mapPrismaTypeToTsType(field.type)
      output += `  ${field.name}${field.isOptional ? '?' : ''}: ${tsType}\n`
    }
    output += '}\n\n'
  }

  return output
}

function mapPrismaTypeToTsType(prismaType: string): string {
  switch (prismaType) {
    case 'Int':
      return 'number'
    case 'String':
      return 'string'
    case 'Boolean':
      return 'boolean'
    case 'DateTime':
      return 'Timestamp'
    case 'Float':
      return 'number'
    default:
      return prismaType // For enums and custom types
  }
}
