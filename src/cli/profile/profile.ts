import {
  Logger,
  createGcloudConfigurations,
  setGcloudProject,
  activateGcloudConfigurations,
  firebaseUseAdd,
  firebaseUseAlias,
} from '@/lib'
import { FIREBASERC_PATH } from '@/index'
import inquirer from 'inquirer'
import { questionList } from './questionList'
import { readFileSync, writeFileSync } from 'fs'
import { projectIdNotExists } from '@/lib/gcloud/billing/checkBillingAccount'

export type initialParams = {
  projectId: string
  fbProjectId: string
}

export type initialProfileParams = {
  profile: string
}

export const addProfile = async () => {
  // Setup Google Cloud Project alias
  const { projectId, fbProjectId } =
    await inquirer.prompt<initialParams>(questionList.projectQuestions)
  if (await projectIdNotExists(projectId))
    Logger.projectIdNotExistsError(projectId)

  const { profile } =
    await inquirer.prompt<initialProfileParams>(questionList.profileQuestions)

  await createGcloudConfigurations(profile)
  await setGcloudProject(projectId)

  // Setup Firebase Project alias
  updateFirebaserc(fbProjectId)
  await firebaseUseAdd(fbProjectId, profile)
}

export const useProfile = async (profile: string) => {
  // use Google Cloud Project alias
  await activateGcloudConfigurations(profile)

  // use Firebase Project alias
  await firebaseUseAlias(profile)
}

const updateFirebaserc = (fbProjectId: string) => {
  const firebaserc = JSON.parse(readFileSync(FIREBASERC_PATH, 'utf-8'))
  firebaserc.projects.default = fbProjectId
  writeFileSync(FIREBASERC_PATH, JSON.stringify(firebaserc, null, 2))
}
