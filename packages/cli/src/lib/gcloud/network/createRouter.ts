import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const createRouter = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const networkNames = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'routers',
    'create',
    networkNames.routerName,
    '--network',
    networkNames.networkName,
    '--region',
    region,
  ]
  await execSyncCmd(shCmd)
}
