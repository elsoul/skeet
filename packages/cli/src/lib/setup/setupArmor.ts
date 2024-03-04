import { syncArmors } from '@/cli/sub/sync/syncArmors'
import { initArmor } from '../gcloud'

export const setupArmor = async (projectId: string, appName: string) => {
  await initArmor()
  await syncArmors()
}
