import { execSyncCmd } from '@/lib/execSyncCmd'
import { KEYFILE_PATH } from '@/lib/getSkeetConfig'

export const createServiceAccountKey = async (
  projectId: string,
  appName: string
) => {
  const createServiceAccountCmd = [
    'gcloud',
    'iam',
    'service-accounts',
    'keys',
    'create',
    KEYFILE_PATH,
    '--iam-account',
    `${appName}@${projectId}.iam.gserviceaccount.com`,
    '--project',
    projectId,
  ]
  await execSyncCmd(createServiceAccountCmd)
}
