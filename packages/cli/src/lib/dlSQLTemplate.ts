import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import {downloadTemplate} from '@/lib/files/downloadFiles'

export const dlSQLTemplate = async (sqlName: string) => {
  const version = TEMPLATE_VERSION.BASE_SQL
  const template = 'base-sql'

  console.log(chalk.blue('🕰️ Downloading SQL Template...'))
  if (await downloadTemplate(template, version)) {
    console.log(chalk.yellow(`⚠️ Fail when download template`))
    return false
  }

  const fileName = `${template}-${version}.tgz`
  const fileDir = `sql/${sqlName}`
  await execAsync(`tar -xvzf ${fileName} -C ${fileDir}`)
  await execAsync(
    `find ${fileDir}/package -mindepth 1 -maxdepth 1 -exec mv {} ${fileDir}/ \\;`,
  )
  await execAsync(`rm -rf ${fileName} ${fileDir}/package`)
  return true
}
