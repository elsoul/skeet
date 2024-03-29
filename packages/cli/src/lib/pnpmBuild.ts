import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const pnpmBuild = async (serviceName: string) => {
  try {
    const cmd = ['pnpm', '-F', `${serviceName}`, 'build']
    const { stdout, stderr } = await execAsyncCmd(cmd)
    console.log(stdout)
    console.log(stderr)
    return true
  } catch (error) {
    throw new Error(`pnpmBuild: ${error}`)
  }
}
