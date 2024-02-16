import { importConfig } from '@/lib'
import { execSync } from 'child_process'
import {
  createSecurityPolicy,
  createSecurityPolicyRule,
  setGcloudProject,
  updateSecurityPolicyRule,
} from '@/lib/gcloud'
import { Logger } from '@/lib'

export const syncArmors = () => {
  const config = importConfig()
  setGcloudProject(config.app.projectId)
  for (const cloudArmor of config.cloudArmor)
    for (const rule of cloudArmor.rules) {
      const securityPolicyName = cloudArmor.securityPolicyName
      const result = isRuleExist(
        config.app.projectId,
        securityPolicyName,
        rule.priority,
      )
      if (result) {
        updateSecurityPolicyRule(
          config.app.projectId,
          securityPolicyName,
          rule.priority,
          rule.options,
        )
      } else {
        console.log(`✅ Creating security policry rule: ${securityPolicyName}`)
        createSecurityPolicy(config.app.projectId, securityPolicyName)
        createSecurityPolicyRule(
          config.app.projectId,
          securityPolicyName,
          rule.description,
          rule.priority,
          rule.options,
        )
      }
    }
  Logger.successCheck(`successfully updated Cloud Armor`)
}

export const isRuleExist = (
  projectId: string,
  securityPolicyName: string,
  priority: string,
) => {
  try {
    const cmd = `gcloud compute security-policies rules describe ${priority} --security-policy=${securityPolicyName} --project=${projectId}`
    execSync(cmd, { stdio: 'ignore' })
    return true
  } catch (error) {
    return false
  }
}
