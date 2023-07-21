import { GRAPHQL_ENV_BUILD_PATH, GRAPHQL_ROOT } from '@/index'
import { spawnSync } from 'child_process'

export const dbDeploy = async (production: boolean = false) => {
  let shCmd = []
  if (production) {
    shCmd = ['dotenv', '-e', '.env.build', 'npx', 'prisma', 'migrate', 'deploy']
  } else {
    shCmd = ['npx', 'prisma', 'migrate', 'deploy']
  }
  spawnSync(shCmd[0], shCmd.slice(1), {
    cwd: GRAPHQL_ROOT,
    stdio: 'inherit',
  })
}
