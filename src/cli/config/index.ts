import { program } from '@/index'
import { importConfig, setGcloudProject } from '@/lib'
import chalk from 'chalk'

export const configCommands = () => {
  const config = program.command('config').description('Config commands')
  const { app } = importConfig()

  config
    .command('set')
    .description('Set Google Cloud Config')
    .option(
      '-p, --project <project>',
      'Set Google Cloud Project',
      app.projectId,
    )
    .action((options) => {
      const projectId = options.project
      if (!projectId) {
        throw new Error('No Project Id')
      }
      setGcloudProject(projectId)
      console.log(chalk.white('⚒️ Set Google Cloud Project:', options.project))
    })
}
