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
  updateBackend,
} from '@/cli'
import { getIp, setGcloudProject } from '@/cli'
import { SkeetCloudConfig } from '@/index'
import { getNetworkConfig } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import { addPathMatcher } from '../gcloud/lb/addPathMatcher'

export const setupLoadBalancer = async (
  config: SkeetCloudConfig,
  appDomain: string,
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
    await createNeg(config.app.projectId, config.app.name, config.app.region)
    await createBackend(config.app.projectId, config.app.name)
    await addBackend(config.app.projectId, config.app.name, config.app.region)
    await createLb(config.app.projectId, config.app.name)
    await createSsl(config.app.projectId, config.app.name, appDomain)
    await createProxy(config.app.projectId, config.app.name)
    await createFr(config.app.projectId, config.app.name)

    const functionName = 'root'
    await createNeg(config.app.projectId, functionName, config.app.region)
    await createBackend(config.app.projectId, functionName)
    await addBackend(config.app.projectId, functionName, config.app.region)
    await addPathMatcher(
      config.app.projectId,
      config.app.name,
      functionName,
      appDomain,
      true
    )
    await updateBackend(config.app.projectId, config.app.name, functionName)

    const ip = await getIp(config.app.projectId, networkConf.loadBalancerIpName)

    await createZone(config.app.projectId, config.app.name, nsDomain)

    await createRecord(
      config.app.projectId,
      networkConf.zoneName,
      appDomain,
      ip
    )
    await createCaaRecords(
      config.app.projectId,
      networkConf.zoneName,
      appDomain
    )
  } catch (error) {
    await Logger.error(`setupLoadBalancer error: ${JSON.stringify(error)}`)
    process.exit(1)
  }
}
