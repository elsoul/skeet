import { program } from '@/index'
import { syncModels } from './syncModels'
import { syncTypes } from './syncTypes'
import { syncRoutings } from './syncRoutings'
import { syncArmors } from './syncArmors'
import { syncSql } from './syncSql'
import { syncTaskQueue } from './syncTaskQueue'
import { syncRunUrl } from './syncRunUrl'

export const syncSubCommands = async () => {
  const sync = program
    .command('sync')
    .description('Skeet Sync Comannd to sync backend and frontend')
  sync
    .command('models')
    .description('Skeet Sync Models')
    .action(async () => {
      await syncModels()
    })
  sync
    .command('types')
    .description('Skeet Sync Types')
    .action(async () => {
      await syncTypes()
    })
  sync
    .command('routings')
    .description('Skeet Sync Routings')
    .action(async () => {
      await syncRoutings()
    })
  sync
    .command('armors')
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
