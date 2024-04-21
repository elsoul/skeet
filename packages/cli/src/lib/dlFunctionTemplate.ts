import { TemplateType } from '@/config/config'
import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import {downloadTemplate} from '@/lib/files/downloadFiles'

export const dlFunctionTemplate = async (functionName: string) => {
  const version = TEMPLATE_VERSION.BASE_FUNCTIONS
  const template: TemplateType = 'base-functions'
  console.log(chalk.blue('🕰️ Downloading function template...'))
  if (!(await downloadTemplate(template, version))) {
    console.log(chalk.yellow(`⚠️ Fail when download template`))
    return false
  }
  const functionPath = `functions/${functionName}-func`
  const fileName = `${template}-${version}.tgz`
  await execAsync(`tar -xvzf ${fileName} -C ${functionPath}`)
  await execAsync(
    `find ${functionPath}/package -mindepth 1 -maxdepth 1 -exec mv {} ${functionPath}/ \\;`,
  )
  await execAsync(`rm -rf ${fileName} ${functionPath}/package`)
  return true
}
