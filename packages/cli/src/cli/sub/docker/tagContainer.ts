import { execSyncCmd, getContainerImageName, getContainerImageUrl } from '@/lib'

export const tagContainer = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const imageName = getContainerImageName(appName)
  const imageUrl = getContainerImageUrl(projectId, appName, region)
  const shCmd = ['docker', 'tag', imageName, imageUrl]
  execSyncCmd(shCmd)
}
