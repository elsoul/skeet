import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'
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
    spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
    return true
  } catch (error) {
    return false
  }
}
