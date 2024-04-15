import inquirer from 'inquirer'
import { setupCloud } from '@/lib/setup/setupCloud'
import { setupLoadBalancer } from '@/lib/setup/setupLoadBalancer'
import { createVpcNetwork } from '@/lib/gcloud/network/createVpcNetwork'
import { initArmor } from '@/lib/gcloud/armor/initArmor'
import { Logger } from '@/lib/logger'
import { getZone } from '@/lib/gcloud/lb/createZone'
import { firebaseFunctionsDeploy } from '../deploy/firebaseDeploy'
import { syncArmors } from '../sub/sync/syncArmors'
import { askForGithubRepo } from './askQuestions'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

type DomainAnswer = {
  appDomain: string
  nsDomain: string
  lbDomain: string
}

export const initLb = async () => {
  const skeetConfig = await readOrCreateConfig()
  const githubRepo = await askForGithubRepo()
  const domainInquirer = await inquirer.prompt<DomainAnswer>(domains)

  await setupCloud(skeetConfig, githubRepo, skeetConfig.app.region)
  await createVpcNetwork(
    skeetConfig.app.projectId,
    skeetConfig.app.name,
    skeetConfig.app.region,
  )
  await firebaseFunctionsDeploy(skeetConfig.app.projectId)

  const lbIp = await setupLoadBalancer(
    skeetConfig,
    domainInquirer.lbDomain,
    domainInquirer.nsDomain,
  )
  await initArmor()
  await syncArmors()
  const ips = await getZone(skeetConfig.app.projectId, skeetConfig.app.name)
  Logger.dnsSetupLog(ips, lbIp)
}

const requireDomainName = (value: string) => {
  if (/.+\..+/.test(value)) {
    return true
  }

  return 'This is not Domain Name!It must be example.com'
}

export const domains = [
  {
    type: 'input',
    name: 'appDomain',
    message: "What's your domain address for App",
    validate: requireDomainName,
    default() {
      return 'app.skeet.dev'
    },
  },
  {
    type: 'input',
    name: 'nsDomain',
    message: "What's your domain address for Domain Name Server",
    validate: requireDomainName,
    default() {
      return 'skeet.dev'
    },
  },
  {
    type: 'input',
    name: 'lbDomain',
    message: "What's your subdomain address for Load Balancer",
    validate: requireDomainName,
    default() {
      return 'lb.skeet.dev'
    },
  },
]
