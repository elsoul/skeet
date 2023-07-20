import { program } from '@/index'
import { syncModels } from './syncModels'
import { syncTypes } from './syncTypes'
import { syncRoutings } from './syncRoutings'
import { syncArmors } from './syncArmors'

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
}
