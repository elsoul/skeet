import { Logger } from '@/lib'
import { execSync } from 'child_process'

/**
 * Sets the Firebase project to be used for the CLI commands.
 * If an alias is provided, it sets the project with the given alias.
 * If no alias is provided, it sets the project without an alias.
 * 
 * @param projectId - The ID of the Firebase project.
 * @param alias - (Optional) The alias to be used for the project.
 * @returns A boolean indicating whether the project was set successfully.
 * @throws An error if the Firebase project is not found or if there is an error executing the command.
 */
export const firebaseUseAdd = async (projectId: string, alias?: string) => {
  try {
    const cmd = (!alias) ? ['firebase', 'use', '--add', projectId] : ['firebase', 'use', '--add', projectId, '--alias', alias]
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

export const firebaseUseAddAlias = async (projectId: string, alias: string) => {
  try {
    const cmd = ['firebase', 'use', '--add', projectId, '--alias', alias]
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