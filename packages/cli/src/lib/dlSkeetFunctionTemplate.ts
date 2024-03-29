import { TemplateType } from '@/config/config'
import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'

export const dlSkeetFunctionTemplate = async () => {
  const version = TEMPLATE_VERSION.SKEET_FUNC
  const template: TemplateType = 'skeet-func'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  const functionPath = `functions/skeet-func`
  console.log(chalk.blue('🕰️ Downloading function template...'))
  await execAsync(cmd)
  await execAsync(`tar -xvzf ${fileName} -C ${functionPath}`)
  await execAsync(
    `find ${functionPath}/package -mindepth 1 -maxdepth 1 -exec mv {} ${functionPath}/ \\;`,
  )
  await execAsync(`rm -rf ${fileName} ${functionPath}/package`)
  return true
}
