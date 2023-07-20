import { addBillingRole, enableBillingIam } from '@/cli/init/init'
import { Logger } from '@/lib/logger'
import { execSync, spawnSync } from 'child_process'

export const createServiceAccount = async (
  projectId: string,
  appName: string
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
    const result = String(execSync(cmd))
    console.log(`Account exists: ${result}`)
  } catch (error) {
    console.log('Service account does not exist, creating new one...')
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
    await enableBillingIam(projectId)
    await addBillingRole(projectId, appName)
    Logger.successCheck('Service account created successfully')
  }
}
