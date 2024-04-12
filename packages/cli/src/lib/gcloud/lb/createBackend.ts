import { getFunctionInfo } from '@/lib'
import { execAsync } from '@skeet-framework/utils'

export const createBackend = async (projectId: string, methodName: string) => {
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
  return await execAsync(shCmd.join(' '))
}
