import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsync } from '@skeet-framework/utils'
import { spawnSync } from 'node:child_process'
import { updateSkeetCloudConfigCloudStatus } from '../../init/updateSkeetCloudConfigCloudStatus'

export const deployFirebaseFunctions = async () => {
  const config = await readOrCreateConfig()
  const cmd1 = `firebase deploy --only functions:skeet-func:root --project ${config.app.projectId}`
  spawnSync(cmd1, { shell: true, stdio: 'inherit' })
  const cmd2 = `firebase functions:list --project ${config.app.projectId}`
  const { stdout } = await execAsync(cmd2)
  if (stdout.includes('root')) {
    console.log(
      '🚀 Deployed Your First Firebase Functions!Please Call Skeet AI with the following command:\n\n$ skeet ai',
    )
    await updateSkeetCloudConfigCloudStatus('FUNCTIONS_CREATED')
    return true
  } else {
    return false
  }
}
