import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

export const createNat = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const networkNames = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'routers',
    'nats',
    'create',
    networkNames.natName,
    '--router',
    networkNames.routerName,
    '--region',
    region,
    '--nat-custom-subnet-ip-ranges',
    networkNames.subnetName,
    '--nat-external-ip-pool',
    networkNames.ipName,
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
