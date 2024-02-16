import { execSyncCmd, getFunctionInfo } from '@/lib'

export const updateBackend = (
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
  execSyncCmd(shCmd)
}
