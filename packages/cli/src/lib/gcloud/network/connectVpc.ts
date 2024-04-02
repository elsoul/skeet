import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

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
    spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
  } catch (error) {
    throw new Error(`connectVpc: ${error}`)
  }
}
