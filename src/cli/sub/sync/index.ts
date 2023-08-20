import { PRISMA_SCHEMA_PATH, program } from '@/index'
import { syncModels } from './syncModels'
import { syncTypes } from './syncTypes'
import { syncRoutings } from './syncRoutings'
import { syncArmors } from './syncArmors'
import { syncSql } from './syncSql'
import { syncTaskQueue } from './syncTaskQueue'
import { syncRunUrl } from './syncRunUrl'
import { readFileSync } from 'node:fs'
import { prismaSchemaToTypeScriptTypes } from './prismaSchemaToTypeScriptType'

export const syncSubCommands = async () => {
  const sync = program
    .command('sync')
    .description('Skeet Sync Comannd to sync backend and frontend')
  sync
    .command('models')
    .alias('m')
    .alias('model')
    .description('Skeet Sync Models')
    .action(async () => {
      await syncModels()
    })
  sync
    .command('types')
    .alias('t')
    .alias('type')
    .description('Skeet Sync Types')
    .action(async () => {
      await syncTypes()
    })
  sync
    .command('routings')
    .alias('r')
    .alias('routing')
    .description('Skeet Sync Routings')
    .action(async () => {
      await syncRoutings()
    })
  sync
    .command('armors')
    .alias('a')
    .alias('armor')
    .description('Skeet Sync Cloud Armor Rules')
    .action(async () => {
      await syncArmors()
    })

  sync
    .command('sql')
    .description('Skeet Sync SQL')
    .action(async () => {
      await syncSql()
    })
  sync
    .command('taskQueue')
    .description('Skeet Sync Task Queue')
    .action(async () => {
      await syncTaskQueue()
    })
  sync
    .command('runUrl')
    .description('Skeet Sync Run Url')
    .action(async () => {
      await syncRunUrl()
    })
}
