import { initFirebaseProject } from './initStep/initFirebaseProject'
import { deployFirebaseFunctions } from './initStep/deployFirebaseFunctions'
import { generanteGitRepo } from './initStep/generanteGitRepo'
import { createVPN } from './initStep/createVPN'
import { createLoadBalancer } from '@/lib'
import { firebaseCreateProject } from '@/lib/firebase/firebaseCreateProject'
import inquirer from 'inquirer'
import { projectQuestions } from './questionList'
import chalk from 'chalk'

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
  const planChanged = await confirmIfContinue(
    `Did you update your firebase plan to Blaze?`,
  )
  if (!planChanged) {
    console.log('Please update your firebase plan to Blaze to continue.')
    process.exit(1)
  }
  await initFirebaseProject(projectId, region)

  // Deploy Firebase Functions(skeet-func) - cloudStatus: 'FUNCTIONS_CREATED'
  const deployNeeded = await confirmIfContinue(
    `Do you want to deploy Firebase Functions now?`,
  )
  if (!deployNeeded) {
    console.log(
      chalk.white(
        `Now you can run skeet app by:\n\n$ skeet s\n\nYou can deploy Firebase Functions later.\n\n$ skeet check\n\nTo check the status of your cloud setup.`,
      ),
    )
    return
  }
  await deployFirebaseFunctions()

  // Generate Github Actions - cloudStatus: 'GITHUB_ACTIONS_CREATED'
  const githubNeeded = await confirmIfContinue(
    `Do you want to create a Github Repo and Actions?`,
  )
  if (!githubNeeded) {
    console.log(
      chalk.white(
        `You can create Github Repo and Actions later.\n\n$ skeet check\n\nTo check the status of your cloud setup.`,
      ),
    )
    return
  }
  await generanteGitRepo()

  // Create VPN and NAT - cloudStatus: 'VPN_CREATED'
  const vpnNeeded = await confirmIfContinue(
    'Do you want to setup Cloud VPN and Load Balancer?\n(※Domain will be required for Load Balancer setup)',
  )
  if (!vpnNeeded) {
    console.log(
      chalk.white(
        `You can setup VPN and Load Balancer later.\n\n$ skeet check\n\nTo check the status of your cloud setup.`,
      ),
    )
    return
  }
  await createVPN()

  // Create Load Balancer - cloudStatus: 'LOAD_BALANCER_CREATED'
  await createLoadBalancer()
}

const confirmIfContinue = async (text: string) => {
  const answer = await inquirer.prompt<{ isConfirmed: boolean }>({
    type: 'confirm',
    name: 'isConfirmed',
    message: text,
    default: false,
  })
  return answer.isConfirmed
}
