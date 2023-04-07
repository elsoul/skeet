import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createNetwork = async (projectId: string, appName: string) => {
  const networkName = (await getNetworkConfig(projectId, appName)).networkName
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
