import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createLb = async (projectId: string, appName: string) => {
  const appConf = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'url-maps',
    'create',
    appConf.loadBalancerName,
    '--default-service',
    appConf.defaultBackendServiceName,
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
