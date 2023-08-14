import { SkeetCloudConfig, SkeetTemplate } from '@/types/skeetTypes'
import { setGcloudProject } from '../gcloud'
import { checkRepoExists, createGitRepo, gitCommit, gitInit } from '../git'
import { Logger } from '../logger'
import { setupGcp } from './setupGcp'
import { addAppJson } from '../files/addJson'

export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string,
  region: string
) => {
  await setGcloudProject(skeetConfig.app.projectId)

  if (await checkRepoExists(repoName)) {
    Logger.warning(
      `⚠️ Repository ${repoName} already exists. Please choose a new repository name. ⚠️\n`
    )
    process.exit(0)
  }
  await gitInit()
  await gitCommit()
  await createGitRepo(repoName)
  if (skeetConfig.app.template === SkeetTemplate.ExpoFirestore) {
    addAppJson(repoName)
  }
  if (skeetConfig.app.template === SkeetTemplate.SolanaFirestore) {
    addAppJson(repoName)
  }
  await setupGcp(skeetConfig, region)
}
