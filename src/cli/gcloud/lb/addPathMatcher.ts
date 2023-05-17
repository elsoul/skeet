import { execSyncCmd } from '@/lib/execSyncCmd'
import { getFunctionInfo, getNetworkConfig } from '@/lib/getSkeetConfig'

export const addPathMatcher = async (
  projectId: string,
  appName: string,
  methodName: string,
  domain: string,
  paths?: Array<string>,
  init = false
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const functionInfo = await getFunctionInfo(methodName)
  paths = paths || []
  paths.push(`/=${appConf.defaultBackendServiceName}`)
  let shCmd = []
  if (init) {
    shCmd = [
      'gcloud',
      'compute',
      'url-maps',
      'add-path-matcher',
      appConf.loadBalancerName,
      '--default-service',
      appConf.defaultBackendServiceName,
      '--path-matcher-name',
      appConf.pathMatcherName,
      '--backend-service-path-rules',
      paths.join(','),
      '--project',
      projectId,
      '--new-hosts',
      domain,
    ]
  } else {
    shCmd = [
      'gcloud',
      'compute',
      'url-maps',
      'add-path-matcher',
      appConf.loadBalancerName,
      '--default-service',
      appConf.defaultBackendServiceName,
      '--path-matcher-name',
      appConf.pathMatcherName,
      '--backend-service-path-rules',
      paths.join(','),
      '--project',
      projectId,
      '--existing-host',
      domain,
      '--delete-orphaned-path-matcher',
    ]
  }
  await execSyncCmd(shCmd)
}
