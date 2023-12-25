import { PATH } from '@/config/path'
import { GRAPHQL_ROOT } from '@/index'
import { execSyncCmd, getContainerImageName, importConfig } from '@/lib'

export const buildContainer = async (appName: string) => {
  const imageName = getContainerImageName(appName)
  const skeetConfig = importConfig()
  const filePath = skeetConfig.app.template.includes('GraphQL')
    ? PATH.GRAPHQL
    : PATH.SQL
  const shCmd = [
    'docker',
    'build',
    '--platform',
    'linux/amd64',
    '-f',
    `${filePath}/Dockerfile`,
    filePath,
    '-t',
    imageName,
  ]
  execSyncCmd(shCmd)
}
