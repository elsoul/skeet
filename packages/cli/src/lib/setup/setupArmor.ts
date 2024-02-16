import { syncArmors } from '@/cli/sub/sync/syncArmors'
import { getZone, initArmor } from '../gcloud'
import { Logger } from '../logger'

export const setupArmor = async (projectId: string, appName: string) => {
  initArmor()
  syncArmors()
}
