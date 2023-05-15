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
    ? `/=${functionInfo.backendService}`
    : `/${functionName}=${functionInfo.backendService}`
  let shCmd = [
    'gcloud',
    'compute',
    'url-maps',
    'add-path-matcher',
    appConf.loadBalancerName,
    '--default-service',
    functionInfo.backendService,
    '--path-matcher-name',
    functionInfo.name,
    '--backend-service-path-rules',
    path,
    '--project',
    projectId,
  ]
  if (init) {
    shCmd.push('--new-hosts', domain)
  } else {
    shCmd.push('--existing-host', domain)
  }
  await execSyncCmd(shCmd)
}
