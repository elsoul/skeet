import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { CloudRunConfig } from '@base-template/skeet-cloud.config'
import chalk from 'chalk'

export const findCloudRunByName = async (cloudRunName: string) => {
  const config = await readOrCreateConfig()
  const cloudRun = config.cloudRun.find(
    (cloudRun) => cloudRun.name === cloudRunName,
  )
  if (!cloudRun) {
    console.log(chalk.yellow('⚠️ Cloud Run not found'))
    process.exit(1)
  }
  return cloudRun as CloudRunConfig
}
