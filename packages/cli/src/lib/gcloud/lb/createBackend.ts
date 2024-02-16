import { execSyncCmd, getFunctionInfo } from '@/lib'

export const createBackend = (projectId: string, methodName: string) => {
  const functionInfo = getFunctionInfo(methodName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'create',
    functionInfo.backendService,
    '--load-balancing-scheme',
    'EXTERNAL_MANAGED',
    '--global',
    '--project',
    projectId,
  ]
  execSyncCmd(shCmd)
}
