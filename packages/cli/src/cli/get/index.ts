import { program } from '@/index'
import { listFunctions, listHttps } from '../sub/list'
import { getSecret } from './getSecret'
import { Logger, importConfig, getZone } from '@/lib'
import { FileType, getRecentUpdatedFiles } from './getRecentUpdatedFiles'
import { firebaseAuthUserGet } from '@/lib/firebase/firebaseAuthUserGet'
import { PATH } from '@/config/path'
import { mkdir } from 'fs/promises'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

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
    .action((secretKey: string) => {
      getSecret(secretKey)
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
    .action(async (options: { output: string; projectId: string }) => {
      const { app } = await importConfig()
      let projectId = app.projectId
      if (options.projectId !== '') {
        projectId = options.projectId
      }
      const tmpDir = PATH.TMP
      if (!(await checkFileDirExists(tmpDir))) {
        await mkdir(tmpDir)
      }
      firebaseAuthUserGet(projectId, options.output)
    })
}
