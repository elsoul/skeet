import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createFr = async (projectId: string, appName: string) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'forwarding-rules',
    'create',
    appConf.forwardingRuleName,
    '--load-balancing-scheme',
    'EXTERNAL_MANAGED',
    '--network-tier',
    'PREMIUM',
    '--address',
    appConf.loadBalancerIpName,
    '--target-https-proxy',
    appConf.proxyName,
    '--global',
    '--ports',
    '443',
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
