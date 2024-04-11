import { initFirebaseProject } from './initStep/initFirebaseProject'
import { deployFirebaseFunctions } from './initStep/deployFirebaseFunctions'
import { generanteGitRepo } from './initStep/generanteGitRepo'
import { createVPN } from './initStep/createVPN'
import { createLoadBalancer } from '@/lib'
import { firebaseCreateProject } from '@/lib/firebase/firebaseCreateProject'
import inquirer from 'inquirer'
import { projectQuestions } from './questionList'

type initialParams = {
  projectId: string
  region: string
}

export const init = async () => {
  const { projectId, region } = await inquirer.prompt<initialParams>(
    await projectQuestions(),
  )
  // Initialize Firebase Project - cloudStatus: 'PROJECT_CREATED'
  await firebaseCreateProject(projectId)
  const planChanged = await confirmIfChangePlanToBlaze()
  if (!planChanged) {
    console.log('Please update your firebase plan to Blaze to continue.')
    process.exit(1)
  }
  await initFirebaseProject(projectId, region)

  // Deploy Firebase Functions(skeet-func) - cloudStatus: 'FUNCTIONS_CREATED'
  await deployFirebaseFunctions()

  // Generate Github Actions - cloudStatus: 'GITHUB_ACTIONS_CREATED'
  await generanteGitRepo()

  // Create VPN and NAT - cloudStatus: 'VPN_CREATED'
  await createVPN()

  // Create Load Balancer - cloudStatus: 'LOAD_BALANCER_CREATED'
  await createLoadBalancer()
}

const confirmIfChangePlanToBlaze = async () => {
  const answer = await inquirer.prompt<{ changePlan: boolean }>({
    type: 'confirm',
    name: 'changePlan',
    message: 'Did you update your firebase plan to Blaze?',
    default: false,
  })
  return answer.changePlan
}
