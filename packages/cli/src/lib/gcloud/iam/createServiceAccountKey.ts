import { KEYFILE_PATH } from '@/lib'
import { spawnSync } from 'node:child_process'

export const createServiceAccountKey = async (
  projectId: string,
  appName: string,
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
  spawnSync(createServiceAccountCmd[0], createServiceAccountCmd.slice(1), {
    stdio: 'inherit',
  })
}
