import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { SKEET_CONFIG_PATH } from '@/index'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { Spinner } from 'cli-spinner'
import { readFile, writeFile } from 'fs/promises'

export const firebaseCreateProject = async (projectId: string) => {
  try {
    const shCmd = [
      'firebase',
      'projects:create',
      projectId,
      '--display-name',
      projectId,
    ]
    const spinner = new Spinner(chalk.blue('🔮 Creating Project...') + ` %s`)
    spinner.start()
    //const result = await execAsync(shCmd.join(' '))
    const result = { stdout: 'a' }
    spinner.stop()
    if (result.stdout === '') {
      throw new Error(
        `Failed to create project because there is already a project with ID ${projectId}. Please try again with a unique project ID.`,
      )
    } else {
      const skeetConfig = await readOrCreateConfig()
      const packageJson = JSON.parse(await readFile('package.json', 'utf-8'))
      packageJson.projectId = projectId
      skeetConfig.app.projectId = projectId
      await writeFile('package.json', JSON.stringify(packageJson, null, 2))
      await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
      console.log(chalk.white('\n' + result.stdout))
      const announce = `
⚠️ Please update your firebase plan to Blaze to fully utilize the features of Skeet Framework.

To update the plan, visit the following link:
https://console.firebase.google.com/u/0/project/${projectId}/usage/details
`
      console.log(chalk.yellow(announce))
    }
    return true
  } catch (error) {
    console.error(`firebaseCreateProject: ${error}`)
    process.exit(1)
  }
}
