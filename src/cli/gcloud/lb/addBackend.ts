import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNegName, getNetworkConfig } from '@/lib/getSkeetConfig'

export const addBackend = async (
  projectId: string,
  appName: string,
  functionName: string,
  region: string
) => {
  const neg = await getNegName(functionName)
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'add-backend',
    appConf.backendServiceName,
    '--network-endpoint-group',
    neg,
    '--network-endpoint-group-region',
    region,
    '--global',
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
