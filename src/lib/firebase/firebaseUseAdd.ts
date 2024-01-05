import { Logger } from '@/lib'
import { execSync } from 'child_process'

export const firebaseUseAdd = async (projectId: string, alias?: string) => {
  try {
    const cmd = (alias) ? ['firebase', 'use', '--add', projectId, '--alias', alias] : ['firebase', 'use', '--add', projectId]
    const result = execSync(cmd.join(' '))
    console.log(result.toString())
    return true
  } catch (error) {
    Logger.warning(`\n⚠️ You need to create a firebase project first ⚠️\n`)
    Logger.normal(
      `Please check if your project exsists.\n\n👉 https://console.firebase.google.com/project/${projectId}\n`
    )
    throw new Error(`firebase project not found - ${error}`)
  }
}