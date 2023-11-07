import { execSyncCmd, getNetworkConfig } from '@/lib'

export const updateSecurityPolicyRule = async (
  projectId: string,
  appName: string,
  priority: string = '1000',
  options: { [key: string]: string } = {},
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'rules',
    'update',
    priority,
    '--security-policy',
    appConf.securityPolicyName,
    '--project',
    projectId,
  ]
  if (Object.keys(options).length !== 0) {
    for await (const [key, value] of Object.entries(options)) {
      shCmd.push(`--${key}=${value}`)
    }
  }
  execSyncCmd(shCmd)
}
