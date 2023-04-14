import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo, getNetworkConfig } from '@/lib/getSkeetConfig'

export const addPathMatcher = async (
  projectId: string,
  appName: string,
  functionName: string,
  domain: string,
  init = false
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const functionInfo = await getFunctionInfo(functionName)
  const path = init
    ? `/*=${functionInfo.backendService}`
    : `/${functionName}/*=${functionInfo.backendService}`
  const shCmd = [
    'gcloud',
    'compute',
    'url-maps',
    'add-path-matcher',
    appConf.loadBalancerName,
    '--default-service',
    functionInfo.backendService,
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
