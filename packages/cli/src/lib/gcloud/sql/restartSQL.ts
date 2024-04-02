import { getNetworkConfig } from '@/lib'
import { spawnSync } from 'node:child_process'

export const restartSQL = async (projectId: string, appName: string) => {
  const instanceName = getNetworkConfig(projectId, appName).instanceName
  const shCmd = [
    'gcloud',
    'sql',
    'instances',
    'restart',
    instanceName,
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
