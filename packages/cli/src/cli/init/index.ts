import { program } from '@/index'
import { init } from './init'
import { generanteGitRepo } from './initStep/generanteGitRepo'
import { createVPN } from './initStep/createVPN'
import {
  createLoadBalancer,
  createServiceAccount,
  runAddAllRole,
  runEnableAllPermission,
} from '@/lib'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

type Options = {
  repo: boolean
  vpn: boolean
  lb: boolean
  iam: boolean
}

export const initCommands = async () => {
  program
    .command('init')
    .option('--repo', 'Configure Github Repo/Actions', false)
    .option('--vpn', 'Setup Cloud VPN', false)
    .option('--lb', 'Setup Load Balancer', false)
    .option('--iam', 'Setup IAM', false)
    .description('Initialize Google Cloud Setups')
    .action(async (options: Options) => {
      if (options.repo) {
        await generanteGitRepo()
      } else if (options.vpn) {
        await createVPN()
      } else if (options.lb) {
        await createLoadBalancer()
      } else if (options.iam) {
        const config = await readOrCreateConfig()
        await createServiceAccount(config.app.projectId, config.app.name)
        await runEnableAllPermission(config.app.projectId)
        await runAddAllRole(config.app.projectId, config.app.name)
      } else {
        await init()
      }
    })
}
