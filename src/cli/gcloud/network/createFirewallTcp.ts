import { execSyncCmd } from '@/lib/execSyncCmd'
import { GCP_IP_RANGE } from '.'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

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
