import { program } from '@/index'
import { dbMigrate } from './dbMigrate'
import { dbGen } from './dbGen'
import { dbDeploy } from './dbDeploy'
import { dbReset } from './dbReset'
import { dbSeed } from './dbSeed'

export const dbSubCommands = async () => {
  const db = program.command('db').description('Database commands')
  db.command('migrate')
    .argument('<name>', 'Name of database')
    .description('Initialize database')
    .option('-p, --production', 'Production mode', false)
    .action(async (name: string, options) => {
      await dbMigrate(name, options.production)
    })

  db.command('generate')
    .description('Prisma Generate command')
    .action(async () => {
      await dbGen()
    })

  db.command('deploy')
    .description('Prisma DB Deploy command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options) => {
      await dbDeploy(options.production)
    })

  db.command('reset')
    .description('Prisma DB Reset command')
    .action(async () => {
      await dbReset()
    })

  db.command('seed')
    .description('Prisma DB Seed command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options) => {
      await dbSeed(options.production)
    })

  db.command('studio')
    .description('Prisma DB Studio command')
    .option('-p, --production', 'Production mode', false)
    .action(async (options) => {
      await dbSeed(options.production)
    })
}
