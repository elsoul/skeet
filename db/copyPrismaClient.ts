import { exec } from 'jsr:@elsoul/child-process'
import { toPascalCase } from 'jsr:@std/text'

const copyPrismaClient = async (dbName: string) => {
  const CamelDBName = toPascalCase(dbName)
  const cmd =
    `cp cmn/prisma/${dbName}/Prisma${CamelDBName}Client/index.js cmn/prisma/${dbName}/Prisma${CamelDBName}Client/index.cjs`
  await exec(cmd)
}

export { copyPrismaClient }
