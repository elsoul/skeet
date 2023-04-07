import { execSyncCmd } from '@/lib/execSyncCmd'

export const createProject = async (projectName: string) => {
  const shCmd = ['gcloud', 'projects', 'create', projectName]
  await execSyncCmd(shCmd)
}
