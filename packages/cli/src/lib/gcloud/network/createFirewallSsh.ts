import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const createFirewallSsh = async (projectId: string, appName: string) => {
  const networkNames = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'firewall-rules',
    'create',
    networkNames.firewallSshName,
    '--network',
    networkNames.networkName,
    '--allow',
    'tcp:22,tcp:3389,icmp',
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
