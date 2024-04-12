import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsync } from '@skeet-framework/utils'
import { spawnSync } from 'node:child_process'
import { updateSkeetCloudConfigCloudStatus } from '../../init/updateSkeetCloudConfigCloudStatus'
import chalk from 'chalk'

export const deployFirebaseFunctions = async () => {
  const config = await readOrCreateConfig()
  spawnSync(`pnpm install`, { shell: true, stdio: 'inherit' })
  spawnSync(`pnpm -F skeet-func build`, { shell: true, stdio: 'inherit' })
  const cmd1 = `firebase deploy --only functions:skeet-func:root --project ${config.app.projectId}`
  spawnSync(cmd1, { shell: true, stdio: 'inherit' })
  const cmd2 = `firebase functions:list --project ${config.app.projectId}`
  const { stdout } = await execAsync(cmd2)
  if (stdout.includes('root')) {
    console.log('🚀 Deployed Your First Firebase Functions!\n')
    const content = chalk.white(
      `https://${config.app.region}-${config.app.projectId}.cloudfunctions.net/root`,
    )
    console.log(`🔗 Your Function URL: ${chalk.underline(content)}\n\n`)
    await updateSkeetCloudConfigCloudStatus('FUNCTIONS_CREATED')
    return true
  } else {
    return false
  }
}
