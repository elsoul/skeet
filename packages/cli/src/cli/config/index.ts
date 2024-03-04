import { program } from '@/index'
import { setGcloudProject } from '@/lib/gcloud/iam'
import chalk from 'chalk'

export const configCommands = () => {
  const config = program.command('config').description('Config commands')

  config
    .command('set')
    .description('Set Google Cloud Config')
    .option('-p, --project <project>', 'Set Google Cloud Project', '')
    .action(async (options) => {
      const projectId = options.project
      if (projectId === '') {
        throw new Error(
          'No Project Id\nPlease set project id with -p <project>',
        )
      }
      await setGcloudProject(projectId)
      console.log(chalk.white('⚒️ Set Google Cloud Project:', options.project))
    })
}
