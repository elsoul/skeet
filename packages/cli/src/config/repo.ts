import { execAsync, existsAsync } from '@skeet-framework/utils'
import { mkdir } from 'fs/promises'
import { TEMPLATE_VERSION } from './templateVersion'
import chalk from 'chalk'

export const getTemplateRepo = async (appName: string) => {
  const version = TEMPLATE_VERSION.BASE_TEMPLATE
  const template = 'base-template'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  console.log(cmd)
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
  return true
}
