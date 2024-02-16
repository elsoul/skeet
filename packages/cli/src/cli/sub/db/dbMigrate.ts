import { PATH } from '@/config/path'
import { spawnSync } from 'child_process'

export const dbMigrate = (production: boolean = false, cwd = './graphql') => {
  try {
    const prismaMigrateCmd = production
      ? ['npx', 'dotenv', '-e', `.env.build`, 'npx', 'prisma', 'migrate', 'dev']
      : ['npx', 'prisma', 'migrate', 'dev']
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
