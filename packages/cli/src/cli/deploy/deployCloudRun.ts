import {
  getBuidEnvString,
  getContainerImageName,
  getContainerImageUrl,
  getNetworkConfig,
} from '@/lib/files/getSkeetConfig'

import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const deployCloudRun = async (
  projectId: string,
  appName: string,
  region: string,
  memory: string = '1Gi',
  cpu: string = '1',
  maxConcurrency: string = '80',
  maxInstances: string = '100',
  minInstances: string = '0',
  hasBalancer: boolean = false,
) => {
  const cloudRunName = appName.replace(/-/g, '')
  const image = getContainerImageUrl(projectId, cloudRunName, region)
  const { connectorName, serviceAccountName } = getNetworkConfig(
    projectId,
    appName,
  )
  const envString = await getBuidEnvString(appName)
  const shCmd = [
    'gcloud',
    'run',
    'deploy',
    cloudRunName,
    '--service-account',
    serviceAccountName,
    '--image',
    image,
    '--memory',
    memory,
    '--cpu',
    cpu,
    '--concurrency',
    maxConcurrency,
    '--max-instances',
    maxInstances,
    '--min-instances',
    minInstances,
    '--region',
    region,
    '--platform=managed',
    '--quiet',
    '--vpc-connector',
    connectorName,
    '--project',
    projectId,
    '--set-env-vars',
    envString,
  ]
  if (hasBalancer) {
    shCmd.push('--ingress', 'internal-and-cloud-load-balancing')
    shCmd.push('--allow-unauthenticated')
  } else if (!hasBalancer) {
    shCmd.push('--allow-unauthenticated')
  } else {
    shCmd.push('--ingress', 'internal')
  }
  await execAsyncCmd(shCmd)
}
