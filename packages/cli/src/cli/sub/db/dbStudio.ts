import { PATH } from '@/config/path'
import { spawnSync } from 'node:child_process'

export const dbStudio = (production: boolean = false, cwd = './graphql') => {
  try {
    let shCmd = []
    if (production) {
      shCmd = ['npx', 'dotenv', '-e', '.env.build', 'npx', 'prisma', 'studio']
    } else {
      shCmd = ['npx', 'prisma', 'studio']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error seeding database: ${error}`)
  }
}
