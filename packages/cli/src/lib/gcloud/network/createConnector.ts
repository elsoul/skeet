import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createConnector = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const networkNames = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'networks',
    'vpc-access',
    'connectors',
    'create',
    networkNames.connectorName,
    '--region',
    region,
    '--subnet-project',
    projectId,
    '--subnet',
    networkNames.subnetName,
  ]
  return await execAsync(shCmd.join(' '))
}
