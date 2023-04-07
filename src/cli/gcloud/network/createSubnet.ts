import { execSyncCmd } from '@/lib/execSyncCmd'
import { GCP_IP_RANGE } from '.'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createSubnet = async (
  projectId: string,
  appName: string,
  region: string
) => {
  const networkNames = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'networks',
    'subnets',
    'create',
    networkNames.subnetName,
    '--range',
    GCP_IP_RANGE,
    '--network',
    networkNames.networkName,
    '--region',
    region,
  ]
  await execSyncCmd(shCmd)
}
