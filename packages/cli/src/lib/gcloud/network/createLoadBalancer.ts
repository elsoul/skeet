import { DomainAnswer } from '@/cli'
import { SkeetCloudConfig } from '@/config/skeetCloud'
import { DEFAULT_FUNCTION_NAME } from '@/index'
import { addDomainToConfig } from '@/lib/files/addJson'
import { setupLoadBalancer } from '@/lib/setup'
import { setupArmor } from '@/lib/setup/setupArmor'

export const createLoadBalancer = async (
  skeetConfig: SkeetCloudConfig,
  domainAnswer: DomainAnswer,
) => {
  try {
    addDomainToConfig(
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
    await setupArmor(skeetConfig.app.projectId, skeetConfig.app.name)
    return true
  } catch (error) {
    throw new Error(`createLoadBalancer error: ${error}`)
  }
}
