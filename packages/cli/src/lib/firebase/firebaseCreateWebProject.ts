import { execSync } from 'child_process'

export const firebaseCreateWebProject = async (appDisplayName: string) => {
  try {
    const shCmd = ['firebase', 'apps:create', 'WEB', appDisplayName]
    const res = String(execSync(shCmd.join(' '))).trim()

    // App IDの抽出
    const appId = extractAppId(res)

    if (appId) {
      console.log('App ID:', appId)
    } else {
      console.log('App ID not found')
    }
    return appId
  } catch (error) {
    throw new Error(`firebaseCreateWebProject: ${error}`)
  }
}

const extractAppId = (output: string) => {
  const regex = /App ID: (.+)/
  const matches = output.match(regex)
  if (matches && matches.length > 1) {
    return matches[1]
  }
  return null
}
