import { program } from '@/index'
import { listFunctions, listHttps } from '../sub/list'
import { Logger, getZone } from '@/lib'
import { FileType, getRecentUpdatedFiles } from './getRecentUpdatedFiles'
import { firebaseAuthUserGet } from '@/lib/firebase/firebaseAuthUserGet'
import { PATH } from '@/config/path'
import { mkdir } from 'fs/promises'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import chalk from 'chalk'
import { firebaseGetSecret } from '@/lib/firebase/firebaseGetSecret'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { getSecretKeys } from '@/lib/files/getSecretKeys'

export const listSubCommands = () => {
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
      const { app } = await readOrCreateConfig()
      const res = await getZone(app.projectId, app.name)
      Logger.dnsSetupLog(res, '<your-load-balancer-ip>')
    })
  get
    .command('secret')
    .option('-k, --key <key>', '')
    .description('Get Skeet Secret Value')
    .action(async (options: { key: string }) => {
      const key = options.key
      if (options.key == null) {
        const keys = await getSecretKeys()
        for (const key of keys) {
          const secret = await firebaseGetSecret(key)
          if (secret) {
            console.log(chalk.white(`🗝️  ${key}: ${secret}`))
          }
        }
        return
      }
      const secret = await firebaseGetSecret(key)
      if (secret) console.log(chalk.white(`🗝️  ${key}: ${secret}`))
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
      const { app } = await readOrCreateConfig()
      let projectId = app.projectId
      if (options.projectId !== '') {
        projectId = options.projectId
      }
      const tmpDir = PATH.TMP
      if (!(await checkFileDirExists(tmpDir))) {
        await mkdir(tmpDir)
      }
      const { stdout } = await firebaseAuthUserGet(projectId, options.output)
      console.log(chalk.white(stdout))
    })
}
