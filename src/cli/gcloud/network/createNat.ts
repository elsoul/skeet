import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createNat = async (
  projectId: string,
  appName: string,
  region: string
) => {
  const networkNames = await getNetworkConfig(projectId, appName)
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
  await execSyncCmd(shCmd)
}
