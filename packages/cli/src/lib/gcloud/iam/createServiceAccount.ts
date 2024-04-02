import { Logger } from '@/lib'
import { execSync, spawnSync } from 'child_process'

export const createServiceAccount = async (
  projectId: string,
  appName: string,
) => {
  try {
    const getServiceAccountCmd = [
      'gcloud',
      'iam',
      'service-accounts',
      'describe',
      `${appName}@${projectId}.iam.gserviceaccount.com`,
      '--project',
      projectId,
      `--format=\"value(email)\"`,
    ]
    const cmd = getServiceAccountCmd.join(' ')
    console.log(cmd)
    execSync(cmd)
  } catch (error) {
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
    Logger.successCheck('Service account created successfully')
  }
}
