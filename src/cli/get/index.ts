import { importConfig, program } from '@/index'
import { listFunctions, listHttps } from '../sub/list'
import { getZone } from '../gcloud'
import { Logger } from '@/lib/logger'
import { getSecret } from './getSecret'

export const listSubCommands = async () => {
  const list = program.command('list').description('Get Skeet App List')
  list
    .command('functions')
    .description('Show Skeet Functions List')
    .action(async () => {
      await listFunctions()
    })
  list
    .command('https')
    .description('Show Skeet Https List')
    .action(async () => {
      await listHttps()
    })
  list
    .command('dns')
    .description('Show Skeet NameServer Records')
    .action(async () => {
      const { app } = await importConfig()
      const res = await getZone(app.projectId, app.name)
      Logger.dnsSetupLog(res)
    })
  list
    .command('secret')
    .argument('<secretKey>', 'Secret Key - e.g. API_KEY')
    .description('Get Skeet Secret Value')
    .action(async (secretKey: string) => {
      await getSecret(secretKey)
    })
}
