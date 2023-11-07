import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createConnector = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const networkNames = await getNetworkConfig(projectId, appName)
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
  execSyncCmd(shCmd)
}
