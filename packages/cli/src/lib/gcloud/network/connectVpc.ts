import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

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
    return await execAsyncCmd(shCmd)
  } catch (error) {
    throw new Error(`connectVpc: ${error}`)
  }
}
