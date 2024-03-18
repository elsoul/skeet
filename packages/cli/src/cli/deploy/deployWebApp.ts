import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const deployWebApp = async () => {
  try {
    const cmd = ['pnpm', 'build:production:webapp']
    await execAsyncCmd(cmd)
    const shCmd = ['firebase', 'deploy', '--only', 'hosting']
    await execAsyncCmd(shCmd)
    return true
  } catch (error) {
    throw new Error(`deployWebApp: ${error}`)
  }
}
