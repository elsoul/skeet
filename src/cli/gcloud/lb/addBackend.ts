import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo } from '@/lib/getSkeetConfig'

export const addBackend = async (
  projectId: string,
  functionName: string,
  region: string
) => {
  const functionInfo = await getFunctionInfo(functionName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'add-backend',
    functionInfo.backendService,
    '--network-endpoint-group',
    functionInfo.neg,
    '--network-endpoint-group-region',
    region,
    '--global',
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
