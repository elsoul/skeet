import { getTemplateRepo } from '@/config/repo'
import { program } from '@/index'
import { Logger } from '@/lib'
import inquirer from 'inquirer'

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
        Logger.skeetAA()
        Logger.welcomText2(answer.name)
        const nmb = Math.floor(Math.random() * 4 + 1)
        if (nmb === 4) {
          Logger.cmText()
        }
      }
    })
}
