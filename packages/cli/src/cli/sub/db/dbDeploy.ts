import { PATH } from '@/config/path'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

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
  await execAsyncCmd(shCmd, cwd)
}
