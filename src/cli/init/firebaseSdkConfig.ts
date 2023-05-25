import { execSync } from 'child_process'

export const firebaseSdkConfig = async () => {
  try {
    const shCmd = ['firebase', 'apps:sdkconfig', '--out', './firebaseConfig.js']
    execSync(shCmd.join(' '))
    return true
  } catch (error) {
    throw new Error(`firebaseSdkConfig: ${error}`)
  }
}
