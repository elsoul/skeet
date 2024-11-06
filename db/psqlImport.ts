import { spawnSync } from '@cmn/utils/spawnSync.ts'

const psqlImport = async (
  dbUser: string,
  dbHost: string,
  dbName: string,
  dbPort: string = '5432',
) => {
  console.log(`📖 psql import started...`)

  const filePath = `./tmp/${dbName}.dump`
  // Prepare the pg_restore command
  const importCmd =
    `pg_restore -U ${dbUser} -h ${dbHost} -p ${dbPort} -d ${dbName} -v ${filePath}`
  console.log(`🚀 Running command: ${importCmd}`)
  // Execute the command with PGPASSWORD set in the environment
  const result = await spawnSync(importCmd)
  if (result.success) {
    console.log(`🟢 psql import completed!`)
    console.log(`📦 Import file: ${filePath}`)
  } else {
    console.error(`🔴 psql import failed: ${result.message}`)
  }
}

psqlImport(
  Deno.env.get('DB_USER') || 'skeeter3510',
  Deno.env.get('DB_HOST') || '24.132.70.177',
  Deno.env.get('DB_NAME') || 'reward',
  Deno.env.get('DB_PORT') || '5432',
)
