import { program } from '@/index'
import { syncRoutings } from './syncRoutings'
import { syncArmors } from './syncArmors'
import { syncSql } from './syncSql'
import { syncTaskQueue } from './syncTaskQueue'
import { addEnvSync } from '@/lib'

export const syncSubCommands = async () => {
  const sync = program
    .command('sync')
    .description('Skeet Sync Comannd to sync backend and frontend')

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
    .alias('tq')
    .description('Skeet Sync Task Queue')
    .action(async () => {
      await syncTaskQueue()
    })

  sync
    .command('ghEnv')
    .option('-p, --path <path>', 'Path to env file', '.env')
    .description('Sync Env File to Github Secret')
    .action(async (option) => {
      await addEnvSync(option.path)
    })
}
