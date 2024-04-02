import { dockerLogin } from '@/cli/sub/docker/dockerLogin'
import { addJsonEnv } from '@/lib/git/addJsonEnv'
import { createServiceAccount } from '@/lib/gcloud/iam/createServiceAccount'
import { createServiceAccountKey } from '@/lib/gcloud/iam/createServiceAccountKey'
import { runEnableAllPermission } from '@/lib/gcloud/iam/enablePermission'
import { runAddAllRole } from '@/lib/gcloud/iam/addRole'
import { setGcloudProject } from '@/lib/gcloud/iam/setGcloudProject'
import { Logger } from '@/lib/logger'
import { sleep } from '@/utils/time'
import { rm } from 'fs/promises'
import { KEYFILE_PATH } from '@/lib/files/getSkeetConfig'
import { SkeetCloudConfig } from '@/config/skeetCloud'

export const setupGcp = async (config: SkeetCloudConfig, region: string) => {
  const spinner = Logger.syncSpinner('Setting up GCP...')
  await setGcloudProject(config.app.projectId)
  await runEnableAllPermission(config.app.projectId)
  await createServiceAccount(config.app.projectId, config.app.name)
  await createServiceAccountKey(config.app.projectId, config.app.name)
  await sleep(2000)
  await addJsonEnv()
  await dockerLogin()
  await sleep(2000)
  await rm(KEYFILE_PATH)
  await runAddAllRole(config.app.projectId, config.app.name)
  spinner.stop()
}
