import { updateSkeetCloudConfigCloudStatus } from '@/cli/init/updateSkeetCloudConfigCloudStatus'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SkeetCloudConfig } from '@/config/skeetCloud'
import {
  addBackend,
  addPathMatcher,
  createBackend,
  createCaaRecords,
  createFixIp,
  createFr,
  createLb,
  createNeg,
  createProxy,
  createRecord,
  createSecurityPolicy,
  createSsl,
  createZone,
  updateBackend,
  getIp,
  setGcloudProject,
  getNetworkConfig,
  Logger,
  SKEET_CONFIG_PATH,
} from '@/lib'
import { writeFile } from 'fs/promises'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'

export const setupLoadBalancer = async (
  config: SkeetCloudConfig,
  lbDomain: string,
  nsDomain: string,
) => {
  const spinner = new Spinner('%s')
  spinner.setSpinnerString(18)
  spinner.start()

  try {
    spinner.setSpinnerTitle(chalk.white('Setting GCP project...'))
    await setGcloudProject(config.app.projectId)

    spinner.setSpinnerTitle(chalk.white('Getting network configuration...'))
    const networkConf = getNetworkConfig(config.app.projectId, config.app.name)

    spinner.setSpinnerTitle(chalk.white('Creating fixed IP...'))
    await createFixIp(
      config.app.projectId,
      config.app.region,
      networkConf.loadBalancerIpName,
      true,
    )

    const methodName = 'root'
    spinner.setSpinnerTitle(chalk.white('Creating NEG...'))
    await createNeg(config.app.projectId, methodName, config.app.region, true)

    const defaultBackendServiceName = `${config.app.name}-default`
    spinner.setSpinnerTitle(chalk.white('Creating backend service...'))
    await createBackend(config.app.projectId, defaultBackendServiceName)

    spinner.setSpinnerTitle(
      chalk.white('Adding backend service to load balancer...'),
    )
    await addBackend(
      config.app.projectId,
      config.app.name,
      defaultBackendServiceName,
      config.app.region,
      true,
    )

    spinner.setSpinnerTitle(chalk.white('Creating load balancer...'))
    await createLb(config.app.projectId, config.app.name)

    spinner.setSpinnerTitle(chalk.white('Creating SSL certificates...'))
    await createSsl(config.app.projectId, config.app.name, lbDomain)

    spinner.setSpinnerTitle(chalk.white('Creating proxy...'))
    await createProxy(config.app.projectId, config.app.name)

    spinner.setSpinnerTitle(chalk.white('Creating forwarding rule...'))
    await createFr(config.app.projectId, config.app.name)

    spinner.setSpinnerTitle(chalk.white('Creating security policy...'))
    const securityPolicyName = getNetworkConfig(
      config.app.projectId,
      config.app.name,
    ).securityPolicyName
    await createSecurityPolicy(config.app.projectId, securityPolicyName)

    spinner.setSpinnerTitle(chalk.white('Updating backend service...'))
    await updateBackend(
      config.app.projectId,
      config.app.name,
      defaultBackendServiceName,
    )

    spinner.setSpinnerTitle(chalk.white('Adding path matchers...'))
    const paths = [] as string[]
    await addPathMatcher(
      config.app.projectId,
      config.app.name,
      lbDomain,
      paths,
      true,
    )

    spinner.setSpinnerTitle(chalk.white('Finalizing load balancer setup...'))
    await hasLoadBalancerTrue()

    spinner.setSpinnerTitle(chalk.white('Retrieving IP...'))
    const ip = await getIp(config.app.projectId, networkConf.loadBalancerIpName)

    spinner.setSpinnerTitle(chalk.white('Creating DNS zone...'))
    await createZone(config.app.projectId, config.app.name, nsDomain)

    spinner.setSpinnerTitle(chalk.white('Creating DNS records...'))
    await createRecord(config.app.projectId, networkConf.zoneName, lbDomain, ip)
    await createCaaRecords(config.app.projectId, networkConf.zoneName, lbDomain)

    spinner.setSpinnerTitle(chalk.white('Updating cloud configuration...'))
    await updateSkeetCloudConfigCloudStatus('LOAD_BALANCER_CREATED')

    spinner.stop(true)
    console.log(chalk.green('⚖️ Load balancer setup completed successfully!\n'))
    return ip
  } catch (error) {
    spinner.stop(true)
    Logger.error(`setupLoadBalancer error: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}

const hasLoadBalancerTrue = async () => {
  try {
    const skeetConfig = await readOrCreateConfig()
    skeetConfig.app.hasLoadBalancer = true
    await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  } catch (error) {
    throw new Error(`hasLoadBalancerTrue error: ${JSON.stringify(error)}`)
  }
}
