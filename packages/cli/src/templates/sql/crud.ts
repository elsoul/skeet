import { toCamelCase, toPascalCase } from '@/utils/string'

export const crud = (sqlName: string, modelName: string) => {
  const modelNamePascal = toPascalCase(modelName)
  const modelNameCamel = toCamelCase(modelName)
  const filePath = `./sql/${sqlName}/src/models/${modelNameCamel}.ts`
  const body = `import { handlePrismaError } from '@/lib/handlePrismaError'
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const create${modelNamePascal} = async (${modelNameCamel}Data: Prisma.${modelNamePascal}CreateInput) => {
  try {
    return await prisma.${modelNameCamel}.create({ data: ${modelNameCamel}Data })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const get${modelNamePascal}ById = async (id: number) => {
  try {
    return await prisma.${modelNameCamel}.findUnique({ where: { id } })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const update${modelNamePascal} = async (
  id: number,
  ${modelNameCamel}Data: Partial<Prisma.${modelNamePascal}CreateInput>,
) => {
  try {
    return await prisma.${modelNameCamel}.update({
      where: { id },
      data: ${modelNameCamel}Data,
    })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const delete${modelNamePascal} = async (id: number) => {
  try {
    return await prisma.${modelNameCamel}.delete({ where: { id } })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const getAll${modelNamePascal}s = async () => {
  try {
    return await prisma.${modelNameCamel}.findMany()
  } catch (error) {
    return handlePrismaError(error)
  }
}

export const query${modelNamePascal}s = async (query: Prisma.${modelNamePascal}FindManyArgs) => {
  try {
    return await prisma.${modelNameCamel}.findMany(query)
  } catch (error) {
    return handlePrismaError(error)
  }
}
`
  return {
    filePath,
    body,
  }
}
