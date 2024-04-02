import { TemplateType } from '@/config/config'
import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync, existsAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { mkdir } from 'fs/promises'

export const dlSkeetFunctionTemplate = async (appName: string) => {
  const version = TEMPLATE_VERSION.SKEET_FUNC
  const template: TemplateType = 'skeet-func-template'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  await execAsync(cmd)
  if (await existsAsync(appName)) {
    console.log(chalk.yellow('⚠️ Folder already exists'))
    return false
  }
  await mkdir(appName)
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
