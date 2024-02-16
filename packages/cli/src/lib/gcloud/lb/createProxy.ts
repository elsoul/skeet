import { execSyncCmd, getNetworkConfig } from '@/lib'

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
  execSyncCmd(shCmd)
}
