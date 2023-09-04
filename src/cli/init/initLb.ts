import inquirer from 'inquirer'
import {
  importConfig,
  setupLoadBalancer,
  getZone,
  initArmor,
  createVpcNetwork,
  setupCloud,
} from '@/lib'
import { Logger } from '@/lib'
import { questionList } from './questionList'
import { firebaseFunctionsDeploy } from '../deploy/firebaseDeploy'
import { syncArmors } from '../sub/sync/syncArmors'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { askForGithubRepo } from './askQuestions'
import { genGithubActions } from '../gen'

export const initLb = async () => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const githubRepo = await askForGithubRepo()
  const domainInquirer = inquirer.prompt(questionList.domainQuestions)
  await domainInquirer.then(async (domainAnswer) => {
    await setupCloud(skeetConfig, githubRepo, skeetConfig.app.region)
    await createVpcNetwork(
      skeetConfig.app.projectId,
      skeetConfig.app.name,
      skeetConfig.app.region
    )
    await genGithubActions()
    await firebaseFunctionsDeploy(skeetConfig.app.fbProjectId)

    await setupLoadBalancer(
      skeetConfig,
      domainAnswer.lbDomain,
      domainAnswer.nsDomain
    )
    await initArmor()
    await syncArmors()
    const ips = await getZone(skeetConfig.app.projectId, skeetConfig.app.name)
    Logger.dnsSetupLog(ips)
  })
}
