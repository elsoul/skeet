import { execSyncCmd, getNetworkConfig } from '@/lib'

export const updateBackendSecurityPolicy = async (
  projectId: string,
  appName: string,
) => {
  const appConf = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'update',
    appConf.defaultBackendServiceName,
    '--security-policy',
    appConf.securityPolicyName,
    '--project',
    projectId,
    '--global',
  ]
  execSyncCmd(shCmd)
}
