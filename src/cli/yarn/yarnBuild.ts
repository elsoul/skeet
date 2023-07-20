import { execSyncCmd } from '@/lib'

export const yarnBuild = async (functionName: string) => {
  try {
    const cmd = ['yarn', '--cwd', `functions/${functionName}`, 'build']
    await execSyncCmd(cmd)
    return true
  } catch (error) {
    throw new Error(`yarnBuild: ${error}`)
  }
}
