import { execSyncCmd } from '@/lib/execSyncCmd'

export const pnpmBuild = async (functionName: string) => {
  try {
    const cmd = ['pnpm', '-F', `${functionName}-func`, 'build']
    await execSyncCmd(cmd)
    return true
  } catch (error) {
    throw new Error(`pnpmBuild: ${error}`)
  }
}
