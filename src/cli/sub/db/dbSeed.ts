import { PATH } from '@/config/path'
import { spawnSync } from 'child_process'

export const dbSeed = (production: boolean = false, cwd = './graphql') => {
  try {
    let shCmd = []
    if (production) {
      shCmd = [
        'npx',
        'dotenv',
        '-e',
        '.env.build',
        'npx',
        'prisma',
        'db',
        'seed',
      ]
    } else {
      shCmd = ['npx', 'prisma', 'db', 'seed']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error seeding database: ${error}`)
  }
}
