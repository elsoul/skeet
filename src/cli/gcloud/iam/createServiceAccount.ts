import { execSyncCmd } from '@/lib/execSyncCmd'

export const createServiceAccount = async (
  projectId: string,
  appName: string
) => {
  const createServiceAccountCmd = [
    'gcloud',
    'iam',
    'service-accounts',
    'create',
    appName,
    "--description='Kinpachi Service Account'",
    `--display-name=${appName}`,
    '--project',
    projectId,
  ]
  await execSyncCmd(createServiceAccountCmd)
}
