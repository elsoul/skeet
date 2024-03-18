import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const addEnv = async (key: string, value: string) => {
  const cmdLine = ['gh', 'secret', 'set', key, '-b', `${value}`]
  await execAsyncCmd(cmdLine)
}
