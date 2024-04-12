import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createRouter = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const networkNames = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'routers',
    'create',
    networkNames.routerName,
    '--network',
    networkNames.networkName,
    '--region',
    region,
  ]
  return await execAsync(shCmd.join(' '))
}
