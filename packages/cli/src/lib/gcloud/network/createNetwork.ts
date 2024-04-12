import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createNetwork = async (projectId: string, appName: string) => {
  const networkName = getNetworkConfig(projectId, appName).networkName
  const shCmd = [
    'gcloud',
    'compute',
    'networks',
    'create',
    networkName,
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
