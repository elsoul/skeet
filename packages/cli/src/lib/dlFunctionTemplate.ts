import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync, existsAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { mkdir } from 'fs/promises'

export const dlFunctionTemplate = async (functionName: string) => {
  const version = TEMPLATE_VERSION.BASE_FUNCTIONS
  const template = 'base-functions'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  const functionPath = `functions/${functionName}-func`
  console.log(cmd)
  await execAsync(cmd)
  await execAsync(`tar -xvzf ${fileName} -C ${functionPath}`)
  await execAsync(`mv ${functionPath}/package/* ${functionPath}/`)
  await execAsync(`rm -rf ${fileName} && ${functionPath}/package`)
  return true
}
