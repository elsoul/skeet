import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const setGcloudProject = async (projectId: string) => {
  try {
    const shCmd = ['gcloud', 'config', 'set', 'project', projectId]
    await execAsyncCmd(shCmd)
  } catch (error) {
    throw new Error(`setGcloudProject: ${error}`)
  }
}
