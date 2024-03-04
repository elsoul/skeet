import { PATH } from '@/config/path'
import { getContainerImageName } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const buildContainer = async (appName: string) => {
  const imageName = await getContainerImageName(appName)
  const filePath = PATH.SQL
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
  await execSyncCmd(shCmd)
}
