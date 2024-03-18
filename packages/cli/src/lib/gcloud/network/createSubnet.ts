import { GCP_IP_RANGE } from '@/config/config'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const createSubnet = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const networkNames = getNetworkConfig(projectId, appName)
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
  await execAsyncCmd(shCmd)
}
