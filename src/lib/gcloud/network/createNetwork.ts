import { execSyncCmd, getNetworkConfig } from '@/lib'

export const createNetwork = async (projectId: string, appName: string) => {
  const networkName = (await getNetworkConfig(projectId, appName)).networkName
  const shCmd = [
    'gcloud',
    'compute',
    'networks',
    'create',
    networkName,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}
