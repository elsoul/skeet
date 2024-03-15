import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'

export const dlFunctionTemplate = async (functionName: string) => {
  const version = TEMPLATE_VERSION.BASE_FUNCTIONS
  const template = 'base-functions'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  const functionPath = `functions/${functionName}-func`
  console.log(chalk.blue('🕰️ Downloading function template...'))
  await execAsync(cmd)
  await execAsync(`tar -xvzf ${fileName} -C ${functionPath}`)
  await execAsync(
    `find ${functionPath}/package -mindepth 1 -maxdepth 1 -exec mv {} ${functionPath}/ \\;`,
  )
  await execAsync(`rm -rf ${fileName} ${functionPath}/package`)
  return true
}
