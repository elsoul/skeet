import { API_ENV_BUILD_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const dbSeed = async (production: boolean = false) => {
  try {
    let shCmd = []
    if (production) {
      shCmd = ['dotenv', '-e', API_ENV_BUILD_PATH, 'yarn', 'db:seed']
    } else {
      shCmd = ['yarn', 'db:seed']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error seeding database: ${error}`)
  }
}
