import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo } from '@/lib/getSkeetConfig'

export const deleteBackend = async (projectId: string, methodName: string) => {
  try {
    const functionInfo = await getFunctionInfo(methodName)
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
    await execSyncCmd(shCmd)
  } catch (error) {
    throw new Error(`deleteBackend: ${error}`)
  }
}
