import { deployCloudRun } from './deployCloudRun'
import { buildContainer } from '../sub/docker/buildContainer'
import { tagContainer } from '../sub/docker/tagContainer'
import { pushContainer } from '../sub/docker/pushContainer'
import { SkeetCloudConfig } from '@/config/skeetCloud'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import chalk from 'chalk'
import { findCloudRunByName } from '@/lib/files/findCloudRunByName'

export const deployCloudRunForSQL = async (cloudRunName: string) => {
  const skeetConfig: SkeetCloudConfig = await readOrCreateConfig()
  const cloudRunConfig = await findCloudRunByName(cloudRunName)
  await buildContainer(cloudRunConfig.name)
  await tagContainer(
    skeetConfig.app.projectId,
    skeetConfig.app.name,
    skeetConfig.app.region,
  )
  await pushContainer(
    skeetConfig.app.projectId,
    skeetConfig.app.name,
    skeetConfig.app.region,
  )
  await deployCloudRun(
    skeetConfig.app.projectId,
    skeetConfig.app.name,
    skeetConfig.app.region,
    cloudRunConfig.memory,
    String(cloudRunConfig.cpu),
    String(cloudRunConfig.maxConcurrency),
    String(cloudRunConfig.maxInstances),
    String(cloudRunConfig.minInstances),
    skeetConfig.app.hasLoadBalancer,
  )
}
