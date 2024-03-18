import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const createNetwork = async (projectId: string, appName: string) => {
  const networkName = getNetworkConfig(projectId, appName).networkName
  const shCmd = [
    'gcloud',
    'compute',
    'networks',
    'create',
    networkName,
    '--project',
    projectId,
  ]
  await execAsyncCmd(shCmd)
}
