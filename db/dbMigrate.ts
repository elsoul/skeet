import { spawnSync } from '@cmn/utils/spawnSync.ts'
import { copyPrismaClient } from '@db/copyPrismaClient.ts'

const dbMigrate = async (dbName: string) => {
  const cmd =
    `deno run -A npm:prisma migrate dev --schema cmn/prisma/${dbName}/${dbName}.prisma`
  await spawnSync(cmd)
  await copyPrismaClient(dbName)
  return
}

const dbName = Deno.args[0]
if (!dbName) {
  throw new Error(
    'Please provide a database name! Example: deno run -A db/dbMigrate.ts rpc-data',
  )
}

await dbMigrate(dbName)
Deno.exit(0)
