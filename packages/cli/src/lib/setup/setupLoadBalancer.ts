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

export const setupLoadBalancer = async (
  config: SkeetCloudConfig,
  lbDomain: string,
  nsDomain: string,
) => {
  try {
    await setGcloudProject(config.app.projectId)
    const networkConf = getNetworkConfig(config.app.projectId, config.app.name)
    await createFixIp(
      config.app.projectId,
      config.app.region,
      networkConf.loadBalancerIpName,
      true,
    )
    const methodName = 'root'
    await createNeg(config.app.projectId, methodName, config.app.region, true)
    const defaultBackendServiceName = `${config.app.name}-default`
    await createBackend(config.app.projectId, defaultBackendServiceName)
    await addBackend(
      config.app.projectId,
      config.app.name,
      defaultBackendServiceName,
      config.app.region,
      true,
    )

    await createLb(config.app.projectId, config.app.name)
    await createSsl(config.app.projectId, config.app.name, lbDomain)
    await createProxy(config.app.projectId, config.app.name)
    await createFr(config.app.projectId, config.app.name)

    const securityPolicyName = getNetworkConfig(
      config.app.projectId,
      config.app.name,
    ).securityPolicyName
    await createSecurityPolicy(config.app.projectId, securityPolicyName)
    await updateBackend(
      config.app.projectId,
      config.app.name,
      defaultBackendServiceName,
    )

    const paths = [] as string[]

    await addPathMatcher(
      config.app.projectId,
      config.app.name,
      lbDomain,
      paths,
      true,
    )

    await hasLoadBalancerTrue()

    const ip = await getIp(config.app.projectId, networkConf.loadBalancerIpName)
    await createZone(config.app.projectId, config.app.name, nsDomain)
    await createRecord(config.app.projectId, networkConf.zoneName, lbDomain, ip)
    await createCaaRecords(config.app.projectId, networkConf.zoneName, lbDomain)
    await updateSkeetCloudConfigCloudStatus('LOAD_BALANCER_CREATED')
  } catch (error) {
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
