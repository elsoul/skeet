import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

export const createIpRange = async (projectId: string, appName: string) => {
  const networkConfig = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'addresses',
    'create',
    networkConfig.ipRangeName,
    '--global',
    '--purpose',
    'VPC_PEERING',
    '--prefix-length',
    '16',
    '--description',
    "'Peering Range for Skeet APP'",
    '--network',
    networkConfig.networkName,
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
