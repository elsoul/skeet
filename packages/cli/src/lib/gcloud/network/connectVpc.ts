import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const connectVpc = async (projectId: string, appName: string) => {
  try {
    const networkConfig = getNetworkConfig(projectId, appName)
    const shCmd = [
      'gcloud',
      'services',
      'vpc-peerings',
      'connect',
      '--service',
      'servicenetworking.googleapis.com',
      '--ranges',
      networkConfig.ipRangeName,
      '--network',
      networkConfig.networkName,
      '--project',
      projectId,
    ]
    return await execSyncCmd(shCmd)
  } catch (error) {
    throw new Error(`connectVpc: ${error}`)
  }
}
