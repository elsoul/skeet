import { importConfig } from '@/lib/importConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'

// This will need updates when Google Cloud Run naming changed
export const createNeg = async (
  projectId: string,
  methodName: string,
  region: string,
  init = false
) => {
  const kebab = convertToKebabCase(methodName)
  const functionInfo = await getFunctionInfo(kebab)
  const config = await importConfig()
  const negName = init
    ? `skeet-${config.app.name}-default-neg`
    : functionInfo.neg
  const cloudRunName = kebab.replace(/-/g, '')
  const shCmd = [
    'gcloud',
    'compute',
    'network-endpoint-groups',
    'create',
    negName,
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
