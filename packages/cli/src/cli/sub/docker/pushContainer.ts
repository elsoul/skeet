import { getContainerImageUrl } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'
export const pushContainer = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const imageUrl = getContainerImageUrl(projectId, appName, region)
  const shCmd = ['docker', 'push', imageUrl]
  await execSyncCmd(shCmd)
}
