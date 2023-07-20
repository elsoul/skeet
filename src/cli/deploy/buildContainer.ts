import { API_PATH } from '@/index'
import { execSyncCmd, getContainerImageName } from '@/lib'

export const buildContainer = async (appName: string) => {
  const imageName = await getContainerImageName(appName)
  const shCmd = [
    'docker',
    'build',
    '--platform',
    'linux/amd64',
    '-f',
    `${API_PATH}/Dockerfile`,
    API_PATH,
    '-t',
    imageName,
  ]
  execSyncCmd(shCmd)
}
