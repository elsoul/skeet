import { GCP_IP_RANGE } from '.'
import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createFirewallTcp = async (projectId: string, appName: string) => {
  const firewallTcpName = (await getNetworkConfig(projectId, appName))
    .firewallTcpName
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
  await execSyncCmd(shCmd)
}
