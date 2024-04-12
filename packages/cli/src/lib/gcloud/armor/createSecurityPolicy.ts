import { execAsync } from '@skeet-framework/utils'

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
    return await execAsync(shCmd.join(' '))
  } catch (error) {
    throw new Error(`createSecurityPolicy: ${error}`)
  }
}
