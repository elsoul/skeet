import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const gitInit = async () => {
  const cmdLine = ['git', 'init', '--initial-branch', 'main']
  execAsyncCmd(cmdLine)
}

export const gitCryptInit = async () => {
  const cmdLine = ['git', 'crypt', 'init']
  execAsyncCmd(cmdLine)
}

export const gitCommit = async () => {
  const cmdLine = ['git', 'add', '.']
  execAsyncCmd(cmdLine)
  const cmdLine2 = ['git', 'commit', '-m', '"first commit"']
  execAsyncCmd(cmdLine2)
}
