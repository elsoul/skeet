import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const updateSecurityPolicy = async (
  projectId: string,
  appName: string,
) => {
  const appConf = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'update',
    appConf.securityPolicyName,
    '--project',
    projectId,
    '--enable-layer7-ddos-defense',
    '--log-level=VERBOSE',
    '--json-parsing=STANDARD',
  ]
  return await execAsyncCmd(shCmd)
}
