import { spawnSync } from '@cmn/utils/spawnSync.ts'

const psqlDump = async (
  dbUser: string,
  dbHost: string,
  dbName: string,
  dbPort: string = '5432',
) => {
  console.log(`📖 psql dump started...`)
  const filePath = `./tmp/${dbName}.dump`
  // Prepare the command
  const exportCmd =
    `pg_dump -U ${dbUser} -h ${dbHost} -p ${dbPort} -F t -b -v -f ${filePath} ${dbName}`
  console.log(`🚀 Running command: ${exportCmd}`)
  // Execute the command with PGPASSWORD set in the environment
  const result = await spawnSync(exportCmd)
  if (result.success) {
    console.log(`🟢 psql dump completed!`)
    console.log(`📦 Dump file: ${filePath}`)
  } else {
    console.error(`🔴 psql dump failed: ${result.message}`)
  }
}

psqlDump(
  Deno.env.get('DB_USER') || 'skeeter3510',
  Deno.env.get('DB_HOST') || '24.132.70.177',
  Deno.env.get('DB_NAME') || 'atuin',
  Deno.env.get('DB_PORT') || '5432',
)
