import { getTemplateRepo } from '@/config/repo'
import { program } from '@/index'
import { Logger } from '@/lib'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { dlSkeetFunctionTemplate } from '@/lib/dlSkeetFunctionTemplate'
import { Spinner } from 'cli-spinner'
import { readFile, writeFile } from 'fs/promises'
import { a } from 'vitest/dist/suite-a18diDsI'

const validateProjectID = (input: string) => {
  // Google Cloud Project IDに適用する正規表現
  const regex = /^[a-z][a-z0-9-]{4,28}[a-z0-9]$/
  return (
    regex.test(input) ||
    chalk.yellow(
      '⚠️ The project ID must start with a lowercase letter, contain only lowercase letters, numbers, and hyphens, must not end with a hyphen, and be 6-30 characters long.',
    )
  )
}

type NewCommandOptions = {
  blank: boolean
}

export const newCommands = async () => {
  program
    .command('new')
    .alias('n')
    .option('-b, --blank', 'Create a blank template', false)
    .description('Create Skeet Framework App')
    .action(async (options: NewCommandOptions) => {
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
      const spinner = new Spinner(
        chalk.blue('🚛 Downloading base template...📦') + ` %s`,
      )
      spinner.setSpinnerString(18)
      spinner.start()
      const result = options.blank
        ? await getTemplateRepo(answer.name)
        : await dlSkeetFunctionTemplate(answer.name)
      spinner.stop()
      if (result) {
        await updatePackageJsonName(answer.name, answer.name + '/package.json')
        const skeetConfig = JSON.parse(
          await readFile(answer.name + '/skeet-cloud.config.json', 'utf-8'),
        )
        skeetConfig.app.name = answer.name
        skeetConfig.app.projectId = answer.name
        await writeFile(
          answer.name + '/skeet-cloud.config.json',
          JSON.stringify(skeetConfig, null, 2),
        )
        Logger.skeetAA()
        Logger.welcomText2(answer.name)
        const nmb = Math.floor(Math.random() * 4 + 1)
        if (nmb === 4) {
          Logger.cmText()
        }
      }
    })
}
