import { importConfig } from '@/lib'
import { execSync } from 'child_process'
import {
  createSecurityPolicy,
  createSecurityPolicyRule,
  setGcloudProject,
  updateSecurityPolicyRule,
} from '@/lib/gcloud'
import { Logger } from '@/lib'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const syncArmors = async () => {
  const config = await readOrCreateConfig()
  await setGcloudProject(config.app.projectId)
  for (const cloudArmor of config.cloudArmor)
    for (const rule of cloudArmor.rules) {
      const securityPolicyName = cloudArmor.securityPolicyName
      const result = isRuleExist(
        config.app.projectId,
        securityPolicyName,
        rule.priority,
      )
      if (result) {
        await updateSecurityPolicyRule(
          config.app.projectId,
          securityPolicyName,
          rule.priority,
          rule.options,
        )
      } else {
        console.log(`✅ Creating security policry rule: ${securityPolicyName}`)
        await createSecurityPolicy(config.app.projectId, securityPolicyName)
        await createSecurityPolicyRule(
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
