import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const updateSecurityPolicyRule = async (
  projectId: string,
  securityPolicyName: string,
  priority: string = '1000',
  options: { [key: string]: string } = {},
) => {
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'rules',
    'update',
    priority,
    '--security-policy',
    securityPolicyName,
    '--project',
    projectId,
  ]
  if (Object.keys(options).length !== 0) {
    for (const [key, value] of Object.entries(options)) {
      shCmd.push(`--${key}=${value}`)
    }
  }
  const log = await execAsyncCmd(shCmd)
  if (log.stdout != null) console.log(log.stdout)
  if (log.stderr != null) console.log(log.stderr)
}
