import { execSyncCmd, getContainerImageUrl } from '@/lib'

export const pushContainer = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const imageUrl = getContainerImageUrl(projectId, appName, region)
  const shCmd = ['docker', 'push', imageUrl]
  execSyncCmd(shCmd)
}
