import { spawnSync } from 'child_process'

export const listSQL = async (projectId: string) => {
  const shCmd = ['gcloud', 'sql', 'instances', 'list', '--project', projectId]
  spawnSync(shCmd[0], shCmd.slice(1), {
    stdio: 'inherit',
  })
}
