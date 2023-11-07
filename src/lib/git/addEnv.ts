import { execSyncCmd } from '@/lib'

export const addEnv = async (key: string, value: string) => {
  const cmdLine = ['gh', 'secret', 'set', key, '-b', `${value}`]
  await execSyncCmd(cmdLine)
}
