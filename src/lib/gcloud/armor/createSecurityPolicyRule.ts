import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createSecurityPolicyRule = async (
  projectId: string,
  appName: string,
  description: string = 'description',
  priority: string = '1000',
  options: { [key: string]: string } = {}
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'rules',
    'create',
    priority,
    '--security-policy',
    appConf.securityPolicyName,
    '--description',
    description,
    '--project',
    projectId,
  ]
  if (Object.keys(options).length !== 0) {
    for await (const [key, value] of Object.entries(options)) {
      shCmd.push(`--${key}=${value}`)
    }
  }
  await execSyncCmd(shCmd)
}
