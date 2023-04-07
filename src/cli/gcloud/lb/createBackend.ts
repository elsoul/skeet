import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createBackend = async (projectId: string, appName: string) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'create',
    appConf.backendServiceName,
    '--load-balancing-scheme',
    'EXTERNAL_MANAGED',
    '--global',
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
