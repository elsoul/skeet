import { GCP_IP_RANGE } from '@/config/config'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

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
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
