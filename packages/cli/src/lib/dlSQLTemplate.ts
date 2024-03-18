import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'

export const dlSQLTemplate = async (sqlName: string) => {
  const version = TEMPLATE_VERSION.BASE_SQL
  const template = 'base-sql'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const cmd = `wget ${BASE_TEMP}`
  const fileDir = `sql/${sqlName}`
  console.log(chalk.blue('🕰️ Downloading SQL Template...'))
  await execAsync(cmd)
  await execAsync(`tar -xvzf ${fileName} -C ${fileDir}`)
  await execAsync(
    `find ${fileDir}/package -mindepth 1 -maxdepth 1 -exec mv {} ${fileDir}/ \\;`,
  )
  await execAsync(`rm -rf ${fileName} ${fileDir}/package`)
  return true
}
