import {
  addBackend,
  createBackend,
  createCaaRecords,
  createFixIp,
  createFr,
  createLb,
  createNeg,
  createProxy,
  createRecord,
  createSsl,
  createZone,
} from '@/cli'
import { getIp, setGcloudProject } from '@/cli'
import { SkeetCloudConfig } from '@/index'
import { getNetworkConfig } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'

export const setupLoadBalancer = async (
  config: SkeetCloudConfig,
  apiDomain: string,
  nsDomain: string,
  functionName: string
) => {
  try {
    await setGcloudProject(config.api.projectId)
    const networkConf = await getNetworkConfig(
      config.api.projectId,
      config.api.appName
    )
    await createFixIp(
      config.api.projectId,
      config.api.region,
      networkConf.loadBalancerIpName,
      true
    )
    await createNeg(config.api.projectId, functionName, config.api.region)
    await createBackend(config.api.projectId, config.api.appName)
    await addBackend(
      config.api.projectId,
      config.api.appName,
      functionName,
      config.api.region
    )
    await createLb(config.api.projectId, config.api.appName)
    await createSsl(config.api.projectId, config.api.appName, apiDomain)
    await createProxy(config.api.projectId, config.api.appName)
    await createFr(config.api.projectId, config.api.appName)

    const ip = await getIp(config.api.projectId, networkConf.loadBalancerIpName)

    await createZone(config.api.projectId, config.api.appName, nsDomain)

    await createRecord(
      config.api.projectId,
      networkConf.zoneName,
      apiDomain,
      ip
    )
    await createCaaRecords(
      config.api.projectId,
      networkConf.zoneName,
      apiDomain
    )
  } catch (error) {
    await Logger.error(`setupLoadBalancer error: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}
