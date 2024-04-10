import inquirer from 'inquirer'
import { projectQuestions } from '../../init/questionList'
import { projectIdNotExists } from '@/lib/gcloud/billing/checkBillingAccount'
import {
  Logger,
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

type initialParams = {
  projectId: string
  fbProjectId: string
  region: string
}

export const initFirebaseProject = async () => {
  const { projectId, fbProjectId, region } =
    await inquirer.prompt<initialParams>(await projectQuestions())
  const isProjectExists = await projectIdNotExists(projectId)
  if (!isProjectExists) {
    Logger.projectIdNotExistsError(projectId)
    return
  }

  await updateFirebaserc(fbProjectId)

  // Setup Firebase Project
  await firebaseLogin()
  await firebaseUseAdd(fbProjectId)
  await addProjectRegionToSkeetOptions(
    region,
    projectId,
    fbProjectId,
    DEFAULT_FUNCTION_NAME,
  )
  const defaultAppDisplayName = fbProjectId
  await addFirebaseApp(fbProjectId, defaultAppDisplayName)
  const config = await readOrCreateConfig()
  const spinner = new Spinner(chalk.blue('🔨 Initializing Project...') + ` %s`)
  console.log('\n')
  spinner.setSpinnerString(18)
  spinner.start()
  await createServiceAccount(projectId, config.app.name)
  await runEnableAllPermission(projectId)
  await runAddAllRole(projectId, config.app.name)
  await updateSkeetCloudConfigCloudStatus('PROJECT_CREATED')
  await writeFile(SKEET_CONFIG_CLOUD_PATH, JSON.stringify(config, null, 2))
  const aiRegion = region.includes('eu') ? 'europe-west4' : region
  await writeFile(
    '.env',
    `GCP_PROJECT_ID=${projectId}\nGCP_LOCATION=${aiRegion}\n`,
  )
  spinner.stop()
}
