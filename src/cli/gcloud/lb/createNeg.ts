import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'

// This will need updates when Google Cloud Run naming changed
export const createNeg = async (
  projectId: string,
  methodName: string,
  region: string
) => {
  const kebab = convertToKebabCase(methodName)
  const cloudRunName = kebab.replace(/-/g, '')
  const functionInfo = await getFunctionInfo(kebab)
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
    cloudRunName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
