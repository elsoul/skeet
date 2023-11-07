import { GCP_IP_RANGE } from '.'
import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createSubnet = async (
  projectId: string,
  appName: string,
  region: string,
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
  execSyncCmd(shCmd)
}
