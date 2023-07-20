import { execSyncCmd, getContainerImageName, getContainerImageUrl } from '@/lib'

export const tagContainer = async (
  projectId: string,
  appName: string,
  region: string
) => {
  const imageName = await getContainerImageName(appName)
  const imageUrl = await getContainerImageUrl(projectId, appName, region)
  const shCmd = ['docker', 'tag', imageName, imageUrl]
  execSyncCmd(shCmd)
}
