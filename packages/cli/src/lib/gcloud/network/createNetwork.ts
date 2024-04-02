import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { spawnSync } from 'node:child_process'

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
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
