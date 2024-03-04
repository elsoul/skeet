import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

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
      'policy for external users',
      '--project',
      projectId,
    ]
    await execSyncCmd(shCmd, '.')
    return true
  } catch (error) {
    return false
  }
}
