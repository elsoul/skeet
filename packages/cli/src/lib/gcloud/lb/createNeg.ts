import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsyncCmd, getFunctionInfo } from '@/lib'
import { convertToKebabCase } from '@/utils/string'

// This will need updates when Google Cloud Run naming changed
export const createNeg = async (
  projectId: string,
  methodName: string,
  region: string,
  init = false,
) => {
  const kebab = convertToKebabCase(methodName)
  const functionInfo = getFunctionInfo(kebab)
  const config = await readOrCreateConfig()
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
  return await execAsyncCmd(shCmd)
}
