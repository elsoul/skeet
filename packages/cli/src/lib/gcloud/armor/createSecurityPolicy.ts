import { spawnSync } from 'node:child_process'

export const createSecurityPolicy = async (
  projectId: string,
  securityPolicyName: string,
) => {
  try {
    const shCmd = [
      'gcloud',
      'compute',
      'security-policies',
      'create',
      securityPolicyName,
      '--description',
      "'policy for external users'",
      '--project',
      projectId,
    ]
    spawnSync(shCmd.join(' '), { stdio: 'inherit', shell: true })
    return true
  } catch (error) {
    throw new Error(`createSecurityPolicy: ${error}`)
  }
}
