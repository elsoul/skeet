import { GRAPHQL_ROOT } from '@/index'
import { spawnSync } from 'child_process'

export const dbGen = async () => {
  try {
    const prismaMigrateCmd = ['npx', 'prisma', 'generate']
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd: GRAPHQL_ROOT,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error generating database: ${error}`)
  }
}
