import {
  execSyncCmd,
  getBuidEnvString,
  getContainerImageName,
  getContainerImageUrl,
  getNetworkConfig,
} from '@/lib'

export const deployCloudRun = async (
  projectId: string,
  appName: string,
  region: string,
  memory: string = '1Gi',
  cpu: string = '1',
  maxConcurrency: string = '80',
  maxInstances: string = '100',
  minInstances: string = '0',
  workerName: string = '',
  isWorkerPlugin: boolean = false,
  hasBalancer: boolean = false
) => {
  let cloudRunName = ''
  let image = ''
  if (workerName === '') {
    cloudRunName = await getContainerImageName(appName)
    image = await getContainerImageUrl(projectId, appName, region)
  } else {
    cloudRunName = await getContainerImageName(appName, workerName)
    image = await getContainerImageUrl(
      projectId,
      appName,
      region,
      workerName,
      isWorkerPlugin
    )
  }
  const { connectorName, serviceAccountName } = await getNetworkConfig(
    projectId,
    appName
  )
  const envString = await getBuidEnvString()
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
  if (hasBalancer && workerName === '') {
    shCmd.push('--ingress', 'internal-and-cloud-load-balancing')
    shCmd.push('--allow-unauthenticated')
  } else if (!hasBalancer && workerName === '') {
    shCmd.push('--allow-unauthenticated')
  } else {
    shCmd.push('--ingress', 'internal')
  }
  await execSyncCmd(shCmd)
}
