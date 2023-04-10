import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo, getNetworkConfig } from '@/lib/getSkeetConfig'

export const createBackend = async (
  projectId: string,
  functionName: string
) => {
  const functionInfo = await getFunctionInfo(functionName)
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
  await execSyncCmd(shCmd)
}
