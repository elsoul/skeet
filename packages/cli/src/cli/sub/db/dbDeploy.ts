import { PATH } from '@/config/path'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const dbDeploy = async (
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
  await execSyncCmd(shCmd, cwd)
}
