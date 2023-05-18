import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createIpRange = async (projectId: string, appName: string) => {
  const networkConfig = await getNetworkConfig(projectId, appName)
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
  await execSyncCmd(shCmd)
}
