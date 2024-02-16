import { execSyncCmd } from '@/lib'

export const pnpmBuild = (functionName: string) => {
  try {
    const cmd = ['pnpm', '-F', `${functionName}-func`, 'build']
    execSyncCmd(cmd)
    return true
  } catch (error) {
    throw new Error(`pnpmBuild: ${error}`)
  }
}
