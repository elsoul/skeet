import { GRAPHQL_ENV_BUILD_PATH, GRAPHQL_ROOT } from '@/index'
import { spawnSync } from 'child_process'

export const dbSeed = async (production: boolean = false) => {
  try {
    let shCmd = []
    if (production) {
      shCmd = ['dotenv', '-e', '.env.build', 'npx', 'prisma', 'db', 'seed']
    } else {
      shCmd = ['npx', 'prisma', 'db', 'seed']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      cwd: GRAPHQL_ROOT,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error seeding database: ${error}`)
  }
}
