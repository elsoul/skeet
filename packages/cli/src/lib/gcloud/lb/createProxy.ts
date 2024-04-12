import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createProxy = async (projectId: string, appName: string) => {
  const appConf = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'target-https-proxies',
    'create',
    appConf.proxyName,
    '--ssl-certificates',
    appConf.sslName,
    '--url-map',
    appConf.loadBalancerName,
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
