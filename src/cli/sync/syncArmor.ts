import { importConfig, SkeetCloudConfig } from '@/index'
import { execSync } from 'child_process'
import { getNetworkConfig } from '@/lib/getSkeetConfig'
import {
  createSecurityPolicyRule,
  setGcloudProject,
  updateSecurityPolicyRule,
} from '@/cli'
import { Logger } from '@/lib/logger'

export const syncArmor = async () => {
  const config = await importConfig()
  await setGcloudProject(config.api.projectId)
  if (config.cloudArmor)
    for await (const rule of config.cloudArmor[0].rules) {
      const result = await isRuleExist(config, rule.priority)
      if (result) {
        await updateSecurityPolicyRule(
          config.api.projectId,
          config.api.appName,
          rule.priority,
          rule.options
        )
      } else {
        console.log('creating...')
        await createSecurityPolicyRule(
          config.api.projectId,
          config.api.appName,
          rule.description,
          rule.priority,
          rule.options
        )
      }
    }
  await Logger.success(`successfully updated Cloud Armor!`)
}

export const isRuleExist = async (
  config: SkeetCloudConfig,
  priority: string
) => {
  try {
    const appConf = await getNetworkConfig(
      config.api.projectId,
      config.api.appName
    )
    if (config.cloudArmor) {
      const cmd = `gcloud compute security-policies rules describe ${priority} --security-policy=${appConf.securityPolicyName} --project=${config.api.projectId}`
      execSync(cmd, { stdio: 'ignore' })
    }
    return true
  } catch (error) {
    return false
  }
}
