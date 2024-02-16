import {
  Logger,
  checkRepoExists,
  createGitRepo,
  gitCommit,
  gitInit,
} from '@/lib'
import inquirer from 'inquirer'

export const addGhActions = async () => {
  const { repoName } = await inquirer.prompt<{ repoName: string }>([
    {
      type: 'input',
      name: 'repoName',
      message: 'Repository Name:',
      default: 'elsoul/skeet-app',
    },
  ])
  if (await checkRepoExists(repoName)) {
    Logger.warning(
      `⚠️ Repository ${repoName} already exists. Please choose a new repository name. ⚠️\n`,
    )
    process.exit(0)
  }
  await gitInit()
  await gitCommit()
  await createGitRepo(repoName)
}
