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
  createSecurityPolicy,
  createSsl,
  createZone,
  updateBackend,
} from '@/cli'
import { getIp, setGcloudProject } from '@/cli'
import { SkeetCloudConfig } from '@/index'
import { getNetworkConfig } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import { addPathMatcher } from '../gcloud/lb/addPathMatcher'

export const setupLoadBalancer = async (
  config: SkeetCloudConfig,
  lbDomain: string,
  nsDomain: string
) => {
  try {
    await setGcloudProject(config.app.projectId)
    const networkConf = await getNetworkConfig(
      config.app.projectId,
      config.app.name
    )
    await createFixIp(
      config.app.projectId,
      config.app.region,
      networkConf.loadBalancerIpName,
      true
    )
    const functionName = 'root'
    await createNeg(config.app.projectId, functionName, config.app.region)
    await createBackend(config.app.projectId, config.app.name)
    await addBackend(
      config.app.projectId,
      config.app.name,
      functionName,
      config.app.region,
      true
    )
    await createLb(config.app.projectId, config.app.name)
    await createSsl(config.app.projectId, config.app.name, lbDomain)
    await createProxy(config.app.projectId, config.app.name)
    await createFr(config.app.projectId, config.app.name)

    await createBackend(config.app.projectId, functionName)
    await addBackend(
      config.app.projectId,
      config.app.name,
      functionName,
      config.app.region
    )
    await addPathMatcher(
      config.app.projectId,
      config.app.name,
      functionName,
      lbDomain
    )
    await createSecurityPolicy(config.app.projectId, config.app.name)
    await updateBackend(config.app.projectId, config.app.name, functionName)

    const ip = await getIp(config.app.projectId, networkConf.loadBalancerIpName)

    await createZone(config.app.projectId, config.app.name, nsDomain)

    await createRecord(config.app.projectId, networkConf.zoneName, lbDomain, ip)
    await createCaaRecords(config.app.projectId, networkConf.zoneName, lbDomain)
  } catch (error) {
    await Logger.error(`setupLoadBalancer error: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}
