import { spawnSync } from 'child_process'

export const createProject = async (projectName: string) => {
  const shCmd = ['gcloud', 'projects', 'create', projectName]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
