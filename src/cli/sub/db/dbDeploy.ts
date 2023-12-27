import { PATH } from '@/config/path'
import { spawnSync } from 'child_process'

export const dbDeploy = (
  production: boolean = false,
  cwd = PATH.GRAPHQL as string,
) => {
  let shCmd = []
  if (production) {
    shCmd = [
      'npx',
      'dotenv',
      '-e',
      '.env.build',
      'npx',
      'prisma',
      'migrate',
      'deploy',
    ]
  } else {
    shCmd = ['npx', 'prisma', 'migrate', 'deploy']
  }
  spawnSync(shCmd[0], shCmd.slice(1), {
    cwd,
    stdio: 'inherit',
  })
}
