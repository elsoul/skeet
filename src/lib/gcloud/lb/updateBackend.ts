import { execSyncCmd, getFunctionInfo, getNetworkConfig } from '@/lib'

export const updateBackend = (
  projectId: string,
  appName: string,
  methodName: string,
) => {
  const functionInfo = getFunctionInfo(methodName)
  const skeetConfig = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'update',
    functionInfo.backendService,
    '--security-policy',
    skeetConfig.securityPolicyName,
    '--global',
    '--project',
    projectId,
  ]
  execSyncCmd(shCmd)
}
