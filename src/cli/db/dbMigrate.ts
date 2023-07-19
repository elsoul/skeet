import { API_ENV_BUILD_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const dbMigrate = async (production: boolean = false) => {
  let shCmd = []
  if (production) {
    shCmd = ['dotenv', '-e', API_ENV_BUILD_PATH, 'yarn', 'db:deploy']
  } else {
    shCmd = ['yarn', 'db:deploy']
  }
  spawnSync(shCmd[0], shCmd.slice(1), {
    stdio: 'inherit',
  })
}
