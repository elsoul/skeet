import { execSyncCmd } from '@/lib/execSyncCmd'

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
  await execSyncCmd(shCmd)
}
