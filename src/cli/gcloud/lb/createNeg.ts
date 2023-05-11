import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'

export const createNeg = async (
  projectId: string,
  functionName: string,
  region: string
) => {
  const functionInfo = await getFunctionInfo(functionName)
  const kebab = convertToKebabCase(functionName)
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
    kebab,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
