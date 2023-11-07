import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createSecurityPolicy = async (
  projectId: string,
  appName: string,
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'create',
    appConf.securityPolicyName,
    '--description',
    'policy for external users',
    '--project',
    projectId,
  ]
  execSyncCmd(shCmd)
}
