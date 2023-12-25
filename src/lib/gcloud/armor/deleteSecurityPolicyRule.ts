import { execSyncCmd, getNetworkConfig } from '@/lib'

export const deleteSecurityPolicyRule = (
  projectId: string,
  appName: string,
  priority: string = '1000',
) => {
  const appConf = getNetworkConfig(projectId, appName)
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
  execSyncCmd(shCmd)
}
