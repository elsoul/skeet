import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createSecurityPolicy = (
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
      'policy for external users',
      '--project',
      projectId,
    ]
    execSyncCmd(shCmd, '.', 'ignore')
    return true
  } catch (error) {
    return false
  }
}
