import { execSync } from 'child_process'

export const firebaseSdkConfig = async (appId: string, platform = 'WEB') => {
  try {
    const shCmd = [
      'firebase',
      'apps:sdkconfig',
      platform,
      appId,
      '--out',
      `./firebaseConfig.js`,
    ]
    execSync(shCmd.join(' '))
    return true
  } catch (error) {
    throw new Error(`firebaseSdkConfig: ${error}`)
  }
}
