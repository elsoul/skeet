import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const updateBackendSecurityPolicy = async (
  projectId: string,
  appName: string
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'update',
    appConf.backendServiceName,
    '--security-policy',
    appConf.securityPolicyName,
    '--project',
    projectId,
    '--global',
  ]
  await execSyncCmd(shCmd)
}
