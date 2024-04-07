import { initFirebaseProject } from './initStep/initFirebaseProject'
import { deployFirebaseFunctions } from './initStep/deployFirebaseFunctions'
import { generanteGitRepo } from './initStep/generanteGitRepo'
import { createVPN } from './initStep/createVPN'

export const init = async () => {
  // Initialize Firebase Project - cloudStatus: 'PROJECT_CREATED'
  await initFirebaseProject()

  // Deploy Firebase Functions(skeet-func) - cloudStatus: 'FUNCTIONS_CREATED'
  await deployFirebaseFunctions()

  // Generate Github Actions - cloudStatus: 'GITHUB_ACTIONS_CREATED'
  await generanteGitRepo()

  // Create VPN and NAT - cloudStatus: 'VPN_CREATED'
  await createVPN()
}
