import { importConfig, execSyncCmd, getFunctionInfo } from '@/lib'
import { convertToKebabCase } from '@/utils/string'

// This will need updates when Google Cloud Run naming changed
export const createNeg = async (
  projectId: string,
  methodName: string,
  region: string,
  init = false,
) => {
  const kebab = convertToKebabCase(methodName)
  const functionInfo = await getFunctionInfo(kebab)
  const config = importConfig()
  const negName = init
    ? `skeet-${config.app.name}-default-neg`
    : functionInfo.neg
  let cloudRunName = kebab.replace(/-/g, '')
  if (methodName === 'graphql') {
    cloudRunName = `skeet-${config.app.name}-graphql`
  } else if (methodName === 'sql') {
    cloudRunName = `skeet-${config.app.name}-sql`
  }
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
  execSyncCmd(shCmd)
}
