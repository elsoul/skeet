import { API_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const dbMigrate = async (name: string, production: boolean = false) => {
  try {
    const prismaMigrateCmd = production
      ? [
          'dotenv',
          '-e',
          `${API_PATH}/.env.build`,
          'npx',
          'prisma',
          'migrate',
          'dev',
          '--name',
          name,
        ]
      : ['npx', 'prisma', 'migrate', 'dev', '--name', name]
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd: API_PATH,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
