import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'

export const createZone = async (
  projectId: string,
  appName: string,
  domain: string
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'dns',
    'managed-zones',
    'create',
    appConf.zoneName,
    '--dns-name',
    domain,
    '--visibility',
    'public',
    '--description',
    `Skeet ${domain} config`,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}

export const getZone = async (projectId: string, appName: string) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'dns',
    'managed-zones',
    'describe',
    appConf.zoneName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
