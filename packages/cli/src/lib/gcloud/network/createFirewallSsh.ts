import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

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
  return await execAsync(shCmd.join(' '))
}
