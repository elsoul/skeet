import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

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
  return await execAsyncCmd(shCmd)
}
