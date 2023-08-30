import { program } from '@/index'
import { listFunctions, listHttps } from '../sub/list'
import { getSecret } from './getSecret'
import { Logger, importConfig, getZone, getModels, getColumns } from '@/lib'
import { getRecentUpdatedFiles } from './getRecentUpdatedFiles'

export const listSubCommands = async () => {
  const get = program.command('get').description('Get Skeet App List')
  get
    .command('functions')
    .alias('function')
    .description('Show Skeet Functions List')
    .action(async () => {
      await listFunctions()
    })
  get
    .command('https')
    .description('Show Skeet Https List')
    .action(async () => {
      await listHttps()
    })
  get
    .command('dns')
    .description('Show Skeet NameServer Records')
    .action(async () => {
      const { app } = await importConfig()
      const res = await getZone(app.projectId, app.name)
      Logger.dnsSetupLog(res)
    })
  get
    .command('secret')
    .argument('<secretKey>', 'Secret Key - e.g. API_KEY')
    .description('Get Skeet Secret Value')
    .action(async (secretKey: string) => {
      await getSecret(secretKey)
    })
  get
    .command('models')
    .alias('m')
    .alias('model')
    .description('Show Skeet Models List')
    .action(async () => {
      await getModels()
    })
  get
    .command('columns')
    .alias('c')
    .alias('column')
    .argument('<modelName>', 'Model Name - e.g. User')
    .description('Show Skeet Models columns')
    .action(async (modelName: string) => {
      await getColumns(modelName)
    })
  get
    .command('files')
    .alias('file')
    .description('Show Recent Updated Files')
    .option('-d, --dir <dir>', 'Directory Path')
    .option('-l, --limit <limit>', 'Limit')
    .action(async (options: { dir: string; limit: string }) => {
      const dir = options.dir || process.cwd()
      const limit = Number(options.limit) || 5
      await getRecentUpdatedFiles(dir, limit)
    })
}
