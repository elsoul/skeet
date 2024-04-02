import { spawnSync } from 'node:child_process'

export const appCreate = async (projectId: string, region: string) => {
  const shCmd = [
    'gcloud',
    'app',
    'create',
    '--region',
    region,
    '--quiet',
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
