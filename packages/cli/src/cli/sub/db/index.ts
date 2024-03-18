import { program } from '@/index'
import { dbMigrate } from './dbMigrate'
import { dbGen } from './dbGen'
import { dbDeploy } from './dbDeploy'
import { dbReset } from './dbReset'
import { dbSeed } from './dbSeed'
import { dbStudio } from './dbStudio'
import { selectDb } from './selectDb'
import { writePrismaSchemaToFunctions } from '../sync/prismaSchemaToTypeScriptType'

type DbOptions = {
  production: boolean
  d: string
}

export const dbSubCommands = () => {
  const db = program.command('db').description('Database commands')
  db.command('migrate')
    .description('Initialize database')
    .option('-p, --production', 'Production mode', false)
    .option('-d <d>', 'Database', 'all')
    .action(async (options: DbOptions) => {
      if (options.d !== 'all') {
        const cwd = './sql/' + options.d
        const { stdout, stderr } = await dbMigrate(cwd, options.production)
        console.log(stdout)
        console.log(stderr)
        return
      }
      const dbDirs = await selectDb()
      for (const dbDir of dbDirs) {
        const cwd = './sql/' + dbDir
        const { stdout, stderr } = await dbMigrate(cwd, options.production)
        console.log(stdout)
        console.log(stderr)
      }
    })

  db.command('generate')
    .description('Prisma Generate command')
    .action(async () => {
      const dbDirs = await selectDb()
      for (const dbDir of dbDirs) {
        const cwd = './sql/' + dbDir
        dbGen(cwd)
      }
    })

  db.command('deploy')
    .alias('dev')
    .description('Prisma DB Deploy command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options: DbOptions) => {
      const dbDirs = await selectDb()
      for (const dbDir of dbDirs) {
        const cwd = './sql/' + dbDir
        const modelPath = cwd + '/prisma/schema.prisma'
        await dbDeploy(options.production, cwd)
        await writePrismaSchemaToFunctions(modelPath)
      }
    })

  db.command('reset')
    .description('Prisma DB Reset command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options: DbOptions) => {
      const dbDirs = await selectDb()
      for (const dbDir of dbDirs) {
        const cwd = './sql/' + dbDir
        await dbReset(options.production, cwd)
      }
    })

  db.command('seed')
    .description('Prisma DB Seed command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options) => {
      const dbDirs = await selectDb()
      for (const dbDir of dbDirs) {
        const cwd = './sql/' + dbDir
        dbSeed(options.production, cwd)
      }
    })

  db.command('studio')
    .description('Prisma DB Studio command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options: DbOptions) => {
      const dbDirs = await selectDb()
      for (const dbDir of dbDirs) {
        const cwd = './sql/' + dbDir
        dbStudio(options.production, cwd)
      }
    })
}
