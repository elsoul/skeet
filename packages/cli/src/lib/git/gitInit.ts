import { execSyncCmd } from '@/lib/execSyncCmd'

export const gitInit = async () => {
  const cmdLine = ['git', 'init', '--initial-branch', 'main']
  execSyncCmd(cmdLine)
}

export const gitCryptInit = async () => {
  const cmdLine = ['git', 'crypt', 'init']
  execSyncCmd(cmdLine)
}

export const gitCommit = async () => {
  const cmdLine = ['git', 'add', '.']
  execSyncCmd(cmdLine)
  const cmdLine2 = ['git', 'commit', '-m', '"first commit"']
  execSyncCmd(cmdLine2)
}
