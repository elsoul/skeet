import { program } from '@/index'
import { init } from './init'
import { generanteGitRepo } from './initStep/generanteGitRepo'
import { createVPN } from './initStep/createVPN'

type Options = {
  repo: boolean
  vpn: boolean
}

export const initCommands = async () => {
  program
    .command('init')
    .option('--repo', 'Configure Github Repo/Actions', false)
    .option('--vpn', 'Setup Cloud VPN', false)
    .description('Initialize Google Cloud Setups')
    .action(async (options: Options) => {
      if (options.repo) {
        await generanteGitRepo()
      } else if (options.vpn) {
        await createVPN()
      } else {
        await init()
      }
    })
}
