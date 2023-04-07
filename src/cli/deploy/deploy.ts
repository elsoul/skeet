import { execSyncCmd } from '@/lib/execSyncCmd'
import inquirer from 'inquirer'
import { setGcloudProject } from '@/cli'
import { getNetworkConfig } from '@/lib/getSkeetConfig'
import { importConfig, SkeetCloudConfig } from '@/index'

export const deploy = async () => {
  const config = await importConfig()
  await setGcloudProject(config.api.projectId)
}
