import {
  createServiceAccount,
  createServiceAccountKey,
  setGcloudProject,
  importConfig,
  enableAiPermissions,
  runAiRole,
  Logger,
} from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { addProjectRegionToSkeetConfig } from '../files/addJson'

export const setupIamAi = async () => {
  try {
    await addProjectRegionToSkeetConfig()
    const config: SkeetCloudConfig = await importConfig()
    await setGcloudProject(config.app.projectId)
    await enableAiPermissions(config.app.projectId)
    await createServiceAccount(config.app.projectId, config.app.name)
    await createServiceAccountKey(config.app.projectId, config.app.name)
    await runAiRole(config.app.projectId, config.app.name)
    aiConfigLogExport(config.app.projectId, config.app.region)
  } catch (error) {
    throw new Error(`Failed to Setup AI Permissions: ${error}`)
  }
}

export const aiConfigLogExport = async (projectId: string, region: string) => {
  Logger.warning('🚸 === Copy & Paste below command to your terminal === 🚸\n')
  const exportLog1 = `export GOOGLE_APPLICATION_CREDENTIALS=${process.cwd()}/keyfile.json`
  const exportLog2 = `export GCLOUD_PROJECT=${projectId}`
  const exportLog3 = `export REGION=${region}\n`
  Logger.normal(exportLog1)
  Logger.normal(exportLog2)
  Logger.normal(exportLog3)
  Logger.warning('🚸 =========           END           ========= 🚸\n\n')

  Logger.successCheck(`Successfully Setup AI Permissions`)
}
