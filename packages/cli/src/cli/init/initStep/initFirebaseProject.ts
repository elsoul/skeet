import {
  createServiceAccount,
  firebaseLogin,
  firebaseUseAdd,
  runAddAllRole,
  runEnableAllPermission,
} from '@/lib'
import { writeFile } from 'fs/promises'
import { DEFAULT_FUNCTION_NAME } from '@/index'
import { addProjectRegionToSkeetOptions } from '@/lib/files/addJson'
import { addFirebaseApp } from '../../sub/add/addFirebaseApp'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SKEET_CONFIG_CLOUD_PATH } from '@/config/config'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'
import { updateFirebaserc } from '@/lib/files/updateFirebaserc'
import { updateSkeetCloudConfigCloudStatus } from '../updateSkeetCloudConfigCloudStatus'

export const initFirebaseProject = async (
  projectId: string,
  region: string,
) => {
  // Setup Firebase Project
  await updateFirebaserc(projectId)
  await firebaseLogin()
  await firebaseUseAdd(projectId)
  await addProjectRegionToSkeetOptions(region, projectId, DEFAULT_FUNCTION_NAME)
  const defaultAppDisplayName = projectId
  await addFirebaseApp(projectId, defaultAppDisplayName)
  const config = await readOrCreateConfig()
  const spinner = new Spinner(chalk.blue('🔨 Initializing Project...') + ` %s`)
  spinner.setSpinnerString(18)
  spinner.start()
  await createServiceAccount(projectId, config.app.name)
  await runEnableAllPermission(projectId)
  await runAddAllRole(projectId, config.app.name)
  await updateSkeetCloudConfigCloudStatus('PROJECT_CREATED')
  spinner.stop()
  console.log(`Your Cloud Project has been initialized successfully! 🎉`)
  const aiRegion = region.includes('eu') ? 'europe-west4' : region
  await writeFile(
    '.env',
    `GCP_PROJECT_ID=${projectId}\nGCP_LOCATION=${aiRegion}\n`,
  )
}
