import { spawnSync } from 'child_process'

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
  spawnSync(createServiceAccountCmd[0], createServiceAccountCmd.slice(1), {
    stdio: 'inherit',
  })
}
