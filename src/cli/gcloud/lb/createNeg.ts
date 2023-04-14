import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo, getNegName } from '@/lib/getSkeetConfig'

export const createNeg = async (
  projectId: string,
  functionName: string,
  region: string
) => {
  const functionInfo = await getFunctionInfo(functionName)
  const shCmd = [
    'gcloud',
    'compute',
    'network-endpoint-groups',
    'create',
    functionInfo.neg,
    '--region',
    region,
    '--network-endpoint-type',
    'serverless',
    '--cloud-run-service',
    functionName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
