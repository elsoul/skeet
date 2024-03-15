import { getTemplateRepo } from '@/config/repo'
import { program } from '@/index'
import { Logger } from '@/lib'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import chalk from 'chalk'
import inquirer from 'inquirer'

const validateProjectID = (input: string) => {
  // Google Cloud Project IDに適用する正規表現
  const regex = /^[a-z][a-z0-9-]{4,28}[a-z0-9]$/
  return (
    regex.test(input) ||
    chalk.yellow(
      '⚠️ The project ID must start with a lowercase letter,\n contain only lowercase letters, numbers, and hyphens,\n must not end with a hyphen, and be 6-30 characters long.',
    )
  )
}

export const newCommands = async () => {
  program
    .command('new')
    .description('Create Skeet Framework App')
    .action(async () => {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the app',
          default() {
            return 'skeet-app'
          },
          validate: validateProjectID,
        },
      ])

      const result = await getTemplateRepo(answer.name)
      if (result) {
        await updatePackageJsonName(answer.name, answer.name + '/package.json')
        Logger.skeetAA()
        Logger.welcomText2(answer.name)
        const nmb = Math.floor(Math.random() * 4 + 1)
        if (nmb === 4) {
          Logger.cmText()
        }
      }
    })
}
