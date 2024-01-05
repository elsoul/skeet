import { Logger } from '@/lib'
import { execSync } from 'child_process'

export const firebaseUseAlias = async (alias: string) => {
  try {
    const cmd = ['firebase', 'use', alias]
    const result = execSync(cmd.join(' '))

    console.log(result.toString())
    return true
  } catch (error) {
    Logger.warning(`\n⚠️ You need to create a firebase project alias first ⚠️\n`)
    Logger.normal(
      `Please check if your alias exsists.\n\n👉 '$firebase use'\n`
    )
    throw new Error(`firebase project alias not found - ${error}`)
  }
}