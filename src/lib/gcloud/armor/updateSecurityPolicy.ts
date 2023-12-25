import { execSyncCmd, getNetworkConfig } from '@/lib'

export const updateSecurityPolicy = (projectId: string, appName: string) => {
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
  execSyncCmd(shCmd)
}
