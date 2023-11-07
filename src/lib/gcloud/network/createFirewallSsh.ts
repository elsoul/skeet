import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createFirewallSsh = async (projectId: string, appName: string) => {
  const networkNames = await getNetworkConfig(projectId, appName)
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
  execSyncCmd(shCmd)
}
