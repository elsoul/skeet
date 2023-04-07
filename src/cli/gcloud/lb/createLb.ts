import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createLb = async (projectId: string, appName: string) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'url-maps',
    'create',
    appConf.loadBalancerName,
    '--default-service',
    appConf.backendServiceName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
