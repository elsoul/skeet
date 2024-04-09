import { program } from '@/index'
import { init } from './init'
import { generanteGitRepo } from './initStep/generanteGitRepo'
import { createVPN } from './initStep/createVPN'
import { createLoadBalancer } from '@/lib'

type Options = {
  repo: boolean
  vpn: boolean
  lb: boolean
}

export const initCommands = async () => {
  program
    .command('init')
    .option('--repo', 'Configure Github Repo/Actions', false)
    .option('--vpn', 'Setup Cloud VPN', false)
    .option('--lb', 'Setup Load Balancer', false)
    .description('Initialize Google Cloud Setups')
    .action(async (options: Options) => {
      if (options.repo) {
        await generanteGitRepo()
      } else if (options.vpn) {
        await createVPN()
      } else if (options.lb) {
        await createLoadBalancer()
      } else {
        await init()
      }
    })
}
