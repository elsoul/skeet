import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const createIpRange = async (projectId: string, appName: string) => {
  const networkConfig = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'addresses',
    'create',
    networkConfig.ipRangeName,
    '--global',
    '--purpose',
    'VPC_PEERING',
    '--prefix-length',
    '16',
    '--description',
    'Peering Range for Skeet APP',
    '--network',
    networkConfig.networkName,
    '--project',
    projectId,
  ]
  return await execSyncCmd(shCmd)
}
