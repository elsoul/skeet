import { getNetworkConfig } from '@/lib'
import { createConnector } from './createConnector'
import { createFixIp } from './createFixIp'
import { createFirewallSsh } from './createFirewallSsh'
import { createFirewallTcp } from './createFirewallTcp'
import { createNat } from './createNat'
import { createNetwork } from './createNetwork'
import { createRouter } from './createRouter'
import { createSubnet } from './createSubnet'
import { connectVpc } from './connectVpc'
import { createIpRange } from './createIpRange'

export const runVpcNat = async (
  projectId: string,
  appName: string,
  region: string
) => {
  await createNetwork(projectId, appName)
  await createFirewallTcp(projectId, appName)
  await createFirewallSsh(projectId, appName)
  await createSubnet(projectId, appName, region)
  await createConnector(projectId, appName, region)
  await createRouter(projectId, appName, region)
  const { ipName } = await getNetworkConfig(projectId, appName)
  await createFixIp(projectId, region, ipName)
  await createNat(projectId, appName, region)
  await createIpRange(projectId, appName)
  await connectVpc(projectId, appName)
}
