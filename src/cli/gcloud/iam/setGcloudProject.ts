import { execSyncCmd } from '@/lib/execSyncCmd'

export const setGcloudProject = async (projectId: string) => {
  const shCmd = ['gcloud', 'config', 'set', 'project', projectId]
  await execSyncCmd(shCmd)
}
