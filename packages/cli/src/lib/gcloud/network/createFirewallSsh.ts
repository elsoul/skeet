import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

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
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
