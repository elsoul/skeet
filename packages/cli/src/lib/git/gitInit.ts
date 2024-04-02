import { execAsyncCmd } from '@/lib/execAsyncCmd'
import { spawnSync } from 'node:child_process'

export const gitInit = async () => {
  const cmdLine = ['git', 'init', '--initial-branch', 'main']
  return await execAsyncCmd(cmdLine)
}

export const gitCryptInit = async () => {
  const cmdLine = ['git', 'crypt', 'init']
  return await execAsyncCmd(cmdLine)
}

export const gitCommit = async () => {
  const cmdLine = ['git', 'add', '.']
  await execAsyncCmd(cmdLine)
  const cmdLine2 = ['git', 'commit', '-m', '"first commit"']
  spawnSync(cmdLine2.join(' '), { shell: true, stdio: 'inherit' })
  return true
}
