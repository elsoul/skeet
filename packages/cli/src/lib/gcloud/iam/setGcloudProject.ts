import { execSyncCmd } from '@/lib/execSyncCmd'

export const setGcloudProject = async (projectId: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'set', 'project', projectId]
    await execSyncCmd(shCmd)
  } catch (error) {
    throw new Error(`setGcloudProject: ${error}`)
  }
}
