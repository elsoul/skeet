import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
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
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'

export const createVpcNetwork = async (
  projectId: string,
  appName: string,
  region: string,
) => {
  const spinner = new Spinner('🕸️ %s')
  spinner.setSpinnerString(18)
  spinner.start()

  spinner.setSpinnerTitle(chalk.white('Creating network...'))
  await createNetwork(projectId, appName)
  spinner.setSpinnerTitle(chalk.white('Setting up TCP firewall...'))
  await createFirewallTcp(projectId, appName)
  spinner.setSpinnerTitle(chalk.white('Setting up SSH firewall...'))
  await createFirewallSsh(projectId, appName)
  spinner.setSpinnerTitle(chalk.white('Creating subnet...'))
  await createSubnet(projectId, appName, region)
  spinner.setSpinnerTitle(chalk.white('Creating connector...'))
  await createConnector(projectId, appName, region)
  spinner.setSpinnerTitle(chalk.white('Creating router...'))
  await createRouter(projectId, appName, region)
  spinner.setSpinnerTitle(chalk.white('Configuring fixed IP...'))
  const { ipName } = getNetworkConfig(projectId, appName)
  await createFixIp(projectId, region, ipName)
  spinner.setSpinnerTitle(chalk.white('Setting up NAT...'))
  await createNat(projectId, appName, region)
  spinner.setSpinnerTitle(chalk.white('Creating IP range...'))
  await createIpRange(projectId, appName)
  spinner.setSpinnerTitle(chalk.white('Connecting VPC...'))
  await connectVpc(projectId, appName)

  spinner.stop(true)
  console.log(chalk.green('🌐 VPC network creation completed successfully!'))
}
