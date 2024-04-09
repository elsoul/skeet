import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

export const createFr = async (projectId: string, appName: string) => {
  const appConf = getNetworkConfig(projectId, appName)
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
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
