import { PATH } from '@/config/path'
import { spawnSync } from 'child_process'

export const dbGen = (cwd = PATH.GRAPHQL as string) => {
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
