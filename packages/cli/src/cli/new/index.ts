import { getTemplateRepo } from '@/config/repo'
import { program } from '@/index'
import { Logger } from '@/lib'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import inquirer from 'inquirer'
import { a } from 'vitest/dist/suite-UrZdHRff'

export const newCommands = async () => {
  program
    .command('new')
    .description('Create Skeet Framework App')
    .action(async () => {
      const answer = await inquirer.prompt<{ name: string }>([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the app',
          default() {
            return 'skeet-app'
          },
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
