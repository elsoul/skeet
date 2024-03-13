import { execAsync, existsAsync } from '@skeet-framework/utils'
import { mkdir } from 'fs/promises'
import { TEMPLATE_VERSION } from './templateVersion'

export const getTemplateRepo = async (appName: string) => {
  const version = TEMPLATE_VERSION.BASE_TEMPLATE
  const template = 'base-template'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  await execAsync(cmd, '.', false)
  if (await existsAsync(appName)) {
    console.log('Folder already exists')
    return
  }
  await mkdir(appName)
  await execAsync(`tar -xvzf ${fileName} -C ${appName}`, '.', false)
  await execAsync(`mv ${appName}/package/* ${appName}/`, '.', false)
  await execAsync(`rm -rf ${fileName} && ${appName}/package`, '.', false)
  return true
}
