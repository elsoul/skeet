import { SkeetTemplate } from '@/types/skeetTypes'
import { setGcloudProject } from '@/lib/gcloud/iam/setGcloudProject'
import { gitInit } from '@/lib/git/gitInit'
import { gitCommit } from '@/lib/git/gitInit'
import { createGitRepo } from '@/lib/git/createGitRepo'
import { checkRepoExists } from '@/lib/git/checkRepoExists'
import { Logger } from '@/lib/logger'
import { setupGcp } from '@/lib/setup/setupGcp'
import { addAppJson } from '@/lib/files/addJson'
import { SkeetCloudConfig } from '@/config/skeetCloud'

export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string,
  region: string,
) => {
  await setGcloudProject(skeetConfig.app.projectId)

  if (await checkRepoExists(repoName)) {
    Logger.warning(
      `⚠️ Repository ${repoName} already exists. Please choose a new repository name. ⚠️\n`,
    )
    process.exit(0)
  }
  await gitInit()
  await gitCommit()
  await createGitRepo(repoName)
  await setupGcp(skeetConfig, region)
}
