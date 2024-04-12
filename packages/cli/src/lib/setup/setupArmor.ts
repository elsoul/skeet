import { syncArmors } from '@/cli/sub/sync/syncArmors'
import { initArmor } from '../gcloud'
import chalk from 'chalk'

export const setupArmor = async (projectId: string, appName: string) => {
  console.log(chalk.white('🛡️ Setting up Armor...'))
  await initArmor()
  await syncArmors()
}
