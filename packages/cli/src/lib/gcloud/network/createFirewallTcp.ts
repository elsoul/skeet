import { GCP_IP_RANGE } from '@/config/config'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createFirewallTcp = async (projectId: string, appName: string) => {
  const firewallTcpName = getNetworkConfig(projectId, appName).firewallTcpName
  const shCmd = [
    'gcloud',
    'compute',
    'firewall-rules',
    'create',
    firewallTcpName,
    '--allow',
    'tcp,udp,icmp',
    '--source-ranges',
    GCP_IP_RANGE,
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
