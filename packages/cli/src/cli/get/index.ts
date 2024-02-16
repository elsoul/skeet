import { program } from '@/index'
import { listFunctions, listHttps } from '../sub/list'
import { getSecret } from './getSecret'
import { Logger, importConfig, getZone, getModels, getColumns } from '@/lib'
import { FileType, getRecentUpdatedFiles } from './getRecentUpdatedFiles'
import { firebaseAuthUserGet } from '@/lib/firebase/firebaseAuthUserGet'
import { PATH } from '@/config/path'
import { existsSync, mkdirSync } from 'fs'

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
    .action(() => {
      const { app } = importConfig()
      const res = getZone(app.projectId, app.name)
      Logger.dnsSetupLog(res)
    })
  get
    .command('secret')
    .argument('<secretKey>', 'Secret Key - e.g. API_KEY')
    .description('Get Skeet Secret Value')
    .action((secretKey: string) => {
      getSecret(secretKey)
    })
  get
    .command('models')
    .alias('m')
    .alias('model')
    .description('Show Skeet Models List')
    .action(() => {
      getModels()
    })
  get
    .command('columns')
    .alias('c')
    .alias('column')
    .argument('<modelName>', 'Model Name - e.g. User')
    .description('Show Skeet Models columns')
    .action((modelName: string) => {
      getColumns(modelName)
    })
  get
    .command('files')
    .alias('file')
    .description('Show Recent Updated Files')
    .option('-d, --dir <dir>', 'Directory Path')
    .option('-l, --limit <limit>', 'Limit')
    .option('-t, --translate', 'Json and Markdown Only', false)
    .action(
      async (options: { dir: string; limit: string; translate: boolean }) => {
        const dir = options.dir || process.cwd()
        const limit = Number(options.limit) || 5
        const type = options.translate ? ['json', 'md'] : ['all']
        const result = await getRecentUpdatedFiles(
          dir,
          limit,
          type as FileType[],
        )
        console.log(result)
      },
    )

  get
    .command('users')
    .description('Download Firebase Auth Users in JSON')
    .option('-p, --projectId <projectId>', 'Project Id', '')
    .option('-o, --output <output>', 'Output Path', PATH.FIREBASE_USERS)
    .action((options: { output: string; projectId: string }) => {
      const { app } = importConfig()
      let projectId = app.projectId
      if (options.projectId !== '') {
        projectId = options.projectId
      }
      const tmpDir = PATH.TMP
      if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir)
      }
      firebaseAuthUserGet(projectId, options.output)
    })
}
