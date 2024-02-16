import { execSync } from 'child_process'

export const deployWebApp = async () => {
  try {
    const cmd = ['pnpm', 'build:production:webapp']
    execSync(cmd.join(' '), { stdio: 'inherit' })
    const shCmd = ['firebase', 'deploy', '--only', 'hosting']
    execSync(shCmd.join(' '), { stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deployWebApp: ${error}`)
  }
}
