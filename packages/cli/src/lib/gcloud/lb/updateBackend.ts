import { getFunctionInfo } from '@/lib'
import { execAsync } from '@skeet-framework/utils'

export const updateBackend = async (
  projectId: string,
  securityPolicyName: string,
  methodName: string,
) => {
  const functionInfo = getFunctionInfo(methodName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'update',
    functionInfo.backendService,
    '--security-policy',
    securityPolicyName,
    '--global',
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
