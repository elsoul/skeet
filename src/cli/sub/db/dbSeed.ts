import { API_ENV_BUILD_PATH, API_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const dbSeed = async (production: boolean = false) => {
  try {
    let shCmd = []
    if (production) {
      shCmd = [
        'dotenv',
        '-e',
        API_ENV_BUILD_PATH,
        'npx',
        'prisma',
        'db',
        'seed',
      ]
    } else {
      shCmd = ['npx', 'prisma', 'db', 'seed']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      cwd: API_PATH,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error seeding database: ${error}`)
  }
}
