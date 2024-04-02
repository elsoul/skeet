import { spawnSync } from 'node:child_process'

export const checkRepoExists = async (repoName: string) => {
  const cmd = ['gh', 'repo', 'list']
  const cmdResult = spawnSync(cmd.join(' '))
  const repoExists = String(cmdResult.stdout).trim().includes(repoName)

  return repoExists
}
