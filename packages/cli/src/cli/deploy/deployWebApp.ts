import { execSyncCmd } from '@/lib/execSyncCmd'

export const deployWebApp = async () => {
  try {
    const cmd = ['pnpm', 'build:production:webapp']
    await execSyncCmd(cmd)
    const shCmd = ['firebase', 'deploy', '--only', 'hosting']
    await execSyncCmd(shCmd)
    return true
  } catch (error) {
    throw new Error(`deployWebApp: ${error}`)
  }
}
