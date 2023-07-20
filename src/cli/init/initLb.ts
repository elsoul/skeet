import inquirer from 'inquirer'
import {
  importConfig,
  setupLoadBalancer,
  getZone,
  initArmor,
  runVpcNat,
} from '@/lib'
import { Logger } from '@/lib'
import { InitQuestions } from './initQuestions'
import { genGithubActions, setupCloud } from './init'
import { firebaseFunctionsDeploy } from '../deploy/firebaseDeploy'
import { syncArmors } from '../sub/sync/syncArmors'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const initLb = async () => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const domainInquirer = inquirer.prompt(InitQuestions.domainQuestions)
  await domainInquirer.then(async (domainAnswer) => {
    await setupCloud(
      skeetConfig,
      domainAnswer.githubRepo,
      skeetConfig.app.region
    )
    await runVpcNat(
      skeetConfig.app.projectId,
      skeetConfig.app.name,
      skeetConfig.app.region
    )
    await genGithubActions()
    await firebaseFunctionsDeploy(skeetConfig.app.projectId)

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
