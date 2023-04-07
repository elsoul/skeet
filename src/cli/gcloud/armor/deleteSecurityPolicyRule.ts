import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const deleteSecurityPolicyRule = async (
  projectId: string,
  appName: string,
  priority: string = '1000'
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'rules',
    'delete',
    priority,
    '--security-policy',
    appConf.securityPolicyName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
