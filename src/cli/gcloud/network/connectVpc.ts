import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const connectVpc = async (projectId: string, appName: string) => {
  const networkConfig = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'services',
    'vpc-peerings',
    'connect',
    '--service',
    'servicenetworking.googleapis.com',
    '--ranges',
    networkConfig.ipRangeName,
    '--network',
    networkConfig.networkName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
