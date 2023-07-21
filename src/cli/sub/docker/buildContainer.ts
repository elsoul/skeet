import { GRAPHQL_ROOT } from '@/index'
import { execSyncCmd, getContainerImageName } from '@/lib'

export const buildContainer = async (appName: string) => {
  const imageName = await getContainerImageName(appName)
  const shCmd = [
    'docker',
    'build',
    '--platform',
    'linux/amd64',
    '-f',
    `${GRAPHQL_ROOT}/Dockerfile`,
    GRAPHQL_ROOT,
    '-t',
    imageName,
  ]
  execSyncCmd(shCmd)
}
