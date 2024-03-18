import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const pnpmBuild = async (functionName: string) => {
  try {
    const cmd = ['pnpm', '-F', `${functionName}-func`, 'build']
    await execAsyncCmd(cmd)
    return true
  } catch (error) {
    throw new Error(`pnpmBuild: ${error}`)
  }
}
