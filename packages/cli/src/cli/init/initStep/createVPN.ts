import { setupNetwork } from '@/lib'
import { updateSkeetCloudConfigCloudStatus } from '../../init/updateSkeetCloudConfigCloudStatus'
import chalk from 'chalk'

export const createVPN = async () => {
  await setupNetwork()
  await updateSkeetCloudConfigCloudStatus('VPN_CREATED')
}
