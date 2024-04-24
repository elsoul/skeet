import { TemplateType } from '@/config/config'
import { TEMPLATE_VERSION } from '@/config/templateVersion'
import { execAsync, existsAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { mkdir } from 'fs/promises'

export const dlFunctionTemplate = async (functionName: string) => {
  const version = TEMPLATE_VERSION.BASE_FUNCTIONS
  const template: TemplateType = 'base-functions'
  const BASE_TEMP = `https://registry.npmjs.org/@skeet-framework/${template}/-/${template}-${version}.tgz`
  const fileName = `${template}-${version}.tgz`
  const curlCmd = `curl -f -o ${fileName} ${BASE_TEMP}`
  const functionPath = `functions/${functionName}-func`

  try {
    if (!(await existsAsync(functionPath))) {
      await mkdir(functionPath, { recursive: true })
    }
  } catch (mkdirError) {
    console.error(chalk.red('Error creating directory:'), mkdirError)
    return false
  }

  console.log(curlCmd)
  console.log(chalk.blue('🕰️ Downloading function template...'))

  try {
    const curlRes = await execAsync(curlCmd)
    console.log(curlRes.stdout, curlRes.stderr)
    const tar = await execAsync(`tar -xvzf ${fileName} -C ${functionPath}`)
    console.log(tar.stdout, tar.stderr)
    const mv = await execAsync(
      `find ${functionPath}/package -mindepth 1 -maxdepth 1 -exec mv {} ${functionPath}/ \\;`,
    )
    console.log(mv.stdout, mv.stderr)
    const rm = await execAsync(`rm -rf ${fileName} ${functionPath}/package`)
    console.log(rm.stdout, rm.stderr)
    return true
  } catch (error) {
    console.error(
      chalk.red('Error during template download or extraction:'),
      error,
    )
    return false
  }
}
