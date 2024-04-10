import { DomainAnswer } from '@/cli/init/askQuestions'
import { domainQuestions } from '@/cli/init/questionList'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { DEFAULT_FUNCTION_NAME } from '@/index'
import { addDomainToConfig } from '@/lib/files/addJson'
import { setupLoadBalancer } from '@/lib/setup'
import { setupArmor } from '@/lib/setup/setupArmor'
import inquirer from 'inquirer'
import { getZone } from '../lb'
import { Logger } from '@/lib/logger'
import { spawnSync } from 'node:child_process'

export const createLoadBalancer = async () => {
  try {
    const skeetConfig = await readOrCreateConfig()
    const domainAnswer = await inquirer.prompt<DomainAnswer>(domainQuestions)
    await addDomainToConfig(
      domainAnswer.appDomain,
      domainAnswer.nsDomain,
      domainAnswer.lbDomain,
      DEFAULT_FUNCTION_NAME,
    )
    await setupLoadBalancer(
      skeetConfig,
      domainAnswer.lbDomain,
      domainAnswer.nsDomain,
    )
    spawnSync(`skeet sync routings`, { shell: true, stdio: 'inherit' })
    await setupArmor(skeetConfig.app.projectId, skeetConfig.app.name)
    await updateArmorCloudConifg()
    const ips = await getZone(skeetConfig.app.projectId, skeetConfig.app.name)
    Logger.dnsSetupLog(ips)
    return true
  } catch (error) {
    throw new Error(`createLoadBalancer error: ${error}`)
  }
}

const updateArmorCloudConifg = async () => {
  const config = await readOrCreateConfig()
  config.cloudArmor.push({
    securityPolicyName: `skeet-${config.app.name}-armor`,
    rules: [
      {
        priority: '2147483647',
        description: 'Allow/Deny All IP addresses. default: allow',
        options: {
          action: 'allow',
        },
      },
    ],
  })
}
