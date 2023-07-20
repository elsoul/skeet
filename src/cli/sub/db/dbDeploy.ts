import { API_ENV_BUILD_PATH, API_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const dbDeploy = async (production: boolean = false) => {
  let shCmd = []
  if (production) {
    shCmd = [
      'dotenv',
      '-e',
      API_ENV_BUILD_PATH,
      'npx',
      'prisma',
      'migrate',
      'deploy',
    ]
  } else {
    shCmd = ['npx', 'prisma', 'migrate', 'deploy']
  }
  spawnSync(shCmd[0], shCmd.slice(1), {
    cwd: API_PATH,
    stdio: 'inherit',
  })
}
