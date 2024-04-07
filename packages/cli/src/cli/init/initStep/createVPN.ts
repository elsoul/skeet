import { setupNetwork } from '@/lib'
import { updateSkeetCloudConfigCloudStatus } from '../../init/updateSkeetCloudConfigCloudStatus'

export const createVPN = async () => {
  await setupNetwork()
  await updateSkeetCloudConfigCloudStatus('VPN_CREATED')
}
