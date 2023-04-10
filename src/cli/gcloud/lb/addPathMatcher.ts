import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo, getNetworkConfig } from '@/lib/getSkeetConfig'

export const addPathMatcher = async (
  projectId: string,
  functionName: string,
  domain: string
) => {
  const appConf = await getNetworkConfig(projectId, functionName)
  const functionInfo = await getFunctionInfo(functionName)
  const path = `/${functionName}/*=${functionName}`
  const shCmd = [
    'gcloud',
    'compute',
    'url-maps',
    'add-path-matcher',
    appConf.loadBalancerName,
    '--default-service',
    functionInfo.name,
    '--path-matcher-name',
    functionInfo.name,
    '--new-hosts',
    domain,
    '--backend-service-path-rules',
    path,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
