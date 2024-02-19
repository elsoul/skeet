import { execSyncCmd, getFunctionInfo } from '@/lib'

export const deleteBackend = async (projectId: string, methodName: string) => {
  try {
    const functionInfo = getFunctionInfo(methodName)
    const shCmd = [
      'gcloud',
      'compute',
      'backend-services',
      'delete',
      functionInfo.backendService,
      '--global',
      '--project',
      projectId,
      '--quiet',
    ]
    execSyncCmd(shCmd)
  } catch (error) {
    throw new Error(`deleteBackend: ${error}`)
  }
}