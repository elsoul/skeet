import { PATH } from '@/config/path'
import { spawnSync } from 'child_process'

export const dbMigrate = (
  name: string,
  production: boolean = false,
  cwd = PATH.GRAPHQL,
) => {
  try {
    const prismaMigrateCmd = production
      ? [
          'npx',
          'dotenv',
          '-e',
          `.env.build`,
          'npx',
          'prisma',
          'migrate',
          'dev',
          '--name',
          name,
        ]
      : ['npx', 'prisma', 'migrate', 'dev', '--name', name]
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
