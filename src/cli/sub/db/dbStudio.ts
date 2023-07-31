import { GRAPHQL_ROOT } from '@/index'
import { spawnSync } from 'child_process'

export const dbStudio = async (production: boolean = false) => {
  try {
    let shCmd = []
    if (production) {
      shCmd = ['dotenv', '-e', '.env.build', 'npx', 'prisma', 'studio']
    } else {
      shCmd = ['npx', 'prisma', 'studio']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      cwd: GRAPHQL_ROOT,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error seeding database: ${error}`)
  }
}
