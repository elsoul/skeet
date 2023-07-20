import { API_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const dbReset = async () => {
  try {
    const prismaMigrateCmd = ['npx', 'prisma', 'migrate', 'reset']
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd: API_PATH,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error resetting database: ${error}`)
  }
}
