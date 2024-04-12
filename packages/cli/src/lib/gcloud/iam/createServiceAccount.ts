import { execAsync } from '@skeet-framework/utils'

export const createServiceAccount = async (
  projectId: string,
  appName: string,
) => {
  const createServiceAccountCmd = [
    'gcloud',
    'iam',
    'service-accounts',
    'create',
    appName,
    "--description='Skeet Framework Service Account'",
    `--display-name=${appName}`,
    '--project',
    projectId,
  ]
  return await execAsync(createServiceAccountCmd.join(' '))
}
