import { setupNetwork } from '@/lib'
import { updateSkeetCloudConfigCloudStatus } from '../updateSkeetCloudConfigCloudStatus'

export const initWhenGithubActionsCreated = async () => {
  await setupNetwork()
  await updateSkeetCloudConfigCloudStatus('VPN_CREATED')
}
