import { GRAPHQL_PATH } from '@/index'
import { toUpperCase, toLowerCase } from '@skeet-framework/utils'

export const graphqlQuery = async (modelName: string) => {
  const filePath = GRAPHQL_PATH + '/modelManager/' + modelName + '/query.ts'
  const body = (await queryCodes(modelName)).join('\n')
  return {
    filePath,
    body,
  }
}

export const queryCodes = async (modelName: string) => {
  const modelNameUpper = await toUpperCase(modelName)
  const modelNameLower = await toLowerCase(modelName)
  let codeArray = [
    `import { extendType, nonNull, stringArg } from 'nexus'`,
    `import { connectionFromArray, fromGlobalId } from 'graphql-relay'`,
    `import { ${modelNameUpper} } from 'nexus-prisma'\n`,
    `export const ${modelNameUpper}sQuery = extendType({`,
    `  type: 'Query',`,
    `  definition(t) {`,
    `    t.connectionField('${modelNameLower}Connection', {`,
    `      type: ${modelNameUpper}.$name,`,
    `      async resolve(_, args, ctx, info) {`,
    `        return connectionFromArray(await ctx.prisma.${modelNameLower}.findMany(), args)`,
    `      },`,
    `      extendConnection(t) {`,
    `        t.int('totalCount', {`,
    `          async resolve(source, args, ctx) {`,
    `            return ctx.prisma.${modelNameLower}.count()`,
    `          },`,
    `        })`,
    `      },`,
    `    })`,
    `    t.field('get${modelNameUpper}', {`,
    `      type: ${modelNameUpper}.$name,`,
    `      args: {`,
    `        id: nonNull(stringArg()),`,
    `      },`,
    `      async resolve(_, { id }, ctx) {`,
    `        return await ctx.prisma.${modelNameLower}.findUnique({`,
    `          where: {`,
    `            id: Number(fromGlobalId(id).id),`,
    `          },`,
    `        })`,
    `      },`,
    `    })`,
    `  },`,
    `})`,
  ]
  return codeArray
}
