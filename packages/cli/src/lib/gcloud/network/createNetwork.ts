import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

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
  await execSyncCmd(shCmd)
}
