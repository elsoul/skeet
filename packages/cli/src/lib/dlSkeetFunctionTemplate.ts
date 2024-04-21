import { TemplateType } from '@/config/config'
import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync, existsAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { mkdir } from 'fs/promises'
import { downloadTemplate } from '@/lib/files/downloadFiles'

export const dlSkeetFunctionTemplate = async (appName: string) => {
  const version = TEMPLATE_VERSION.SKEET_FUNC
  const template: TemplateType = 'skeet-func-template'

  if (!(await downloadTemplate(template, version))) {
    console.log(chalk.yellow(`⚠️ Fail when download template`))
    return false
  }

  if (await existsAsync(appName)) {
    console.log(chalk.yellow('⚠️ Folder already exists'))
    return false
  }
  await mkdir(appName)
  const fileName = `${template}-${version}.tgz`
  await execAsync(`tar -xvzf ${fileName} -C ${appName}`)
  await execAsync(
    `find ${appName}/package -mindepth 1 -maxdepth 1 -exec mv {} ${appName}/ \\;`,
  )
  await execAsync(`rm -rf ${fileName} ${appName}/package`)
  await execAsync(
    `rm -rf ${appName}/sql/.keep ${appName}/functions/.keep ${appName}/webapp/.keep ${appName}/website/.keep ${appName}/mobile/.keep ${appName}/common/.keep`,
  )
  await execAsync(`pnpm install`, appName)
  return true
}
