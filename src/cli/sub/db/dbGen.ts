import { GRAPHQL_ROOT } from '@/index'
import { spawnSync } from 'child_process'

export const dbGen = async (cwd = GRAPHQL_ROOT) => {
  try {
    const prismaMigrateCmd = ['npx', 'prisma', 'generate']
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error generating database: ${error}`)
  }
}
