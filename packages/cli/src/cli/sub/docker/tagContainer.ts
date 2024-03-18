import {
  getContainerImageName,
  getContainerImageUrl,
} from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const tagContainer = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const imageName = await getContainerImageName(appName)
  const imageUrl = getContainerImageUrl(projectId, appName, region)
  const shCmd = ['docker', 'tag', imageName, imageUrl]
  await execAsyncCmd(shCmd)
}
