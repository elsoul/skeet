import { execSyncCmd } from '@/lib'

export const checkRepoExists = async (repoName: string) => {
  const cmd = ['gh', 'repo', 'list']
  const { promisify } = require('util')
  const exec = promisify(require('child_process').exec)

  const cmdResult = await exec(cmd.join(' '))
  const repoExists = String(cmdResult.stdout).trim().includes(repoName)

  return repoExists
}
