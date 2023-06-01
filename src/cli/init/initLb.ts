import { SkeetCloudConfig, importConfig } from '@/index'
import inquirer from 'inquirer'
import {
  syncArmors,
  setupLoadBalancer,
  getZone,
  initArmor,
  runVpcNat,
  firebaseDeploy,
  genGithubActions,
  setupCloud,
  InitQuestions,
} from '@/cli'
import { Logger } from '@/lib/logger'

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
    // firebase deploy
    await firebaseDeploy(skeetConfig.app.projectId)

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
