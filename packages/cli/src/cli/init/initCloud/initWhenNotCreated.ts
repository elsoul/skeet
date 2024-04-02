import inquirer from 'inquirer'
import { initialParams } from '../init'
import { projectQuestions } from '../questionList'
import { projectIdNotExists } from '@/lib/gcloud/billing/checkBillingAccount'
import {
  Logger,
  createServiceAccount,
  firebaseLogin,
  firebaseUseAdd,
  runAddAllRole,
  runEnableAllPermission,
} from '@/lib'
import { readFile, writeFile } from 'fs/promises'
import { DEFAULT_FUNCTION_NAME, FIREBASERC_PATH } from '@/index'
import { addProjectRegionToSkeetOptions } from '@/lib/files/addJson'
import { addFirebaseApp } from '../../sub/add/addFirebaseApp'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { SKEET_CONFIG_CLOUD_PATH } from '@/config/config'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'

export const initWhenNotCreated = async () => {
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
  config.app.cloudStatus = 'PROJECT_CREATED'
  await writeFile(SKEET_CONFIG_CLOUD_PATH, JSON.stringify(config, null, 2))
  await writeFile(
    '.env',
    `GCP_PROJECT_ID=${projectId}\nGCP_LOCATION=${region}\n`,
  )
  spinner.stop()
  console.log(chalk.white('\n ✔️ Successfully Initialized Your Project'))
  console.log(
    chalk.white(
      `Now you can try your AI Assistant 🔥\n\n  $ skeet ai --help\n\n`,
    ),
  )
}

const updateFirebaserc = async (fbProjectId: string) => {
  if (!(await checkFileDirExists(FIREBASERC_PATH))) {
    await writeFile(
      FIREBASERC_PATH,
      JSON.stringify({ projects: { default: fbProjectId } }, null, 2),
    )
    return
  }
  const firebaserc = JSON.parse(await readFile(FIREBASERC_PATH, 'utf-8'))
  firebaserc.projects.default = fbProjectId
  await writeFile(FIREBASERC_PATH, JSON.stringify(firebaserc, null, 2))
}
