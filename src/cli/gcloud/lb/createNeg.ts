import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNegName, getNetworkConfig } from '@/lib/getSkeetConfig'

export const createNeg = async (
  projectId: string,
  functionName: string,
  region: string
) => {
  const neg = await getNegName(functionName)
  const shCmd = [
    'gcloud',
    'compute',
    'network-endpoint-groups',
    'create',
    neg,
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
