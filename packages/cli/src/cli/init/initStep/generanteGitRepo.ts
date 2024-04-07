import { genGithubActions } from '@/cli/gen'
import { addGhActions } from '@/cli/sub/add/addGhActions'
import { addJsonEnv } from '@/lib'
import { updateSkeetCloudConfigCloudStatus } from '../updateSkeetCloudConfigCloudStatus'

export const generanteGitRepo = async () => {
  await genGithubActions()
  await addGhActions()
  await addJsonEnv()
  await updateSkeetCloudConfigCloudStatus('GITHUB_ACTIONS_CREATED')
}
