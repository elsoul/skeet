import { program } from '@/index'
import { dbMigrate } from './dbMigrate'
import { dbGen } from './dbGen'
import { dbDeploy } from './dbDeploy'
import { dbReset } from './dbReset'
import { dbSeed } from './dbSeed'
import { dbStudio } from './dbStudio'
import { importConfig } from '@/lib'
import { PATH } from '@/config/path'

type DbOptions = {
  production: boolean
}

export const dbSubCommands = () => {
  const db = program.command('db').description('Database commands')
  db.command('migrate')
    .argument('<name>', 'Name of database')
    .description('Initialize database')
    .option('-p, --production', 'Production mode', false)
    .action((name: string, options: DbOptions) => {
      const { app } = importConfig()
      const cwd = app.template.includes('SQL') ? PATH.SQL : PATH.GRAPHQL
      dbMigrate(name, options.production, cwd)
    })

  db.command('generate')
    .description('Prisma Generate command')
    .action(() => {
      const { app } = importConfig()
      const cwd = app.template.includes('SQL') ? PATH.SQL : PATH.GRAPHQL
      dbGen(cwd)
    })

  db.command('deploy')
    .description('Prisma DB Deploy command')
    .option('-p, --production', 'Production mode', false)
    .action((options: DbOptions) => {
      const { app } = importConfig()
      const cwd = app.template.includes('SQL') ? PATH.SQL : PATH.GRAPHQL
      dbDeploy(options.production, cwd)
    })

  db.command('reset')
    .description('Prisma DB Reset command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options: DbOptions) => {
      const { app } = importConfig()
      const cwd = app.template.includes('SQL') ? PATH.SQL : PATH.GRAPHQL
      await dbReset(options.production, cwd)
    })

  db.command('seed')
    .description('Prisma DB Seed command')
    .option('-p, --production', 'Production mode', false)
    .action((options) => {
      const { app } = importConfig()
      const cwd = app.template.includes('SQL') ? PATH.SQL : PATH.GRAPHQL
      dbSeed(options.production, cwd)
    })

  db.command('studio')
    .description('Prisma DB Studio command')
    .option('-p, --production', 'Production mode', false)
    .action((options: DbOptions) => {
      const { app } = importConfig()
      const cwd = app.template.includes('SQL') ? PATH.SQL : PATH.GRAPHQL
      dbStudio(options.production, cwd)
    })
}
