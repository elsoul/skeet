import { spawnSync } from 'node:child_process'

export const createSecurityPolicyRule = async (
  projectId: string,
  securityPolicyName: string,
  description: string = 'description',
  priority: string = '1000',
  options: { [key: string]: string } = {},
) => {
  const shCmd = [
    'gcloud',
    'compute',
    'security-policies',
    'rules',
    'create',
    priority,
    '--security-policy',
    securityPolicyName,
    '--description',
    description,
    '--project',
    projectId,
  ]
  if (Object.keys(options).length !== 0) {
    for (const [key, value] of Object.entries(options)) {
      shCmd.push(`--${key}=${value}`)
    }
  }
  spawnSync(shCmd.join(' '), { stdio: 'inherit', shell: true })
}
