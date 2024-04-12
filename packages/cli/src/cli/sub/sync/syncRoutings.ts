import {
  getFunctionInfo,
  getHttpRoutings,
  Logger,
  setGcloudProject,
} from '@/lib'
import { convertToKebabCase } from '@/utils/string'
import { addBackendSetup } from '../add/addBackendSetup'
import { addRouting } from '../add/routing'
import { getSQLs } from '@/lib/files/getSQLs'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import chalk from 'chalk'

export const syncRoutings = async () => {
  const { app } = await readOrCreateConfig()
  await setGcloudProject(app.projectId)
  const files = await getHttpRoutings()
  const paths = []
  console.log(chalk.white('⏳ Syncing routings'))
  for (const file of files) {
    for (const methoName of file.httpEndpoints) {
      const methodNameKebab = convertToKebabCase(methoName)
      const method = await findMethod(methoName)
      let securityPolicyName = null
      if (method) {
        securityPolicyName = method.securityPolicyName
      }
      const functionInfo = getFunctionInfo(methodNameKebab)
      console.log(chalk.green(`✅ Adding backend setup for ${methodNameKebab}`))
      await addBackendSetup(methodNameKebab, securityPolicyName)
      const pathString = `/${file.functionName}/${methodNameKebab}=${functionInfo.backendService}`
      paths.push(pathString)
    }
  }

  const sqlDirs = await getSQLs()
  if (sqlDirs.length > 0) {
    for (const methodName of sqlDirs) {
      const sqlInfo = getFunctionInfo(methodName)
      const sqlRouting = await findMethod(methodName)
      const securityPolicyName = sqlRouting
        ? sqlRouting.securityPolicyName
        : null
      await addBackendSetup(methodName, securityPolicyName)
      const sqlPath = `/${methodName}/*=${sqlInfo.backendService}`
      paths.push(sqlPath)
    }
  }

  console.log(chalk.green('✅ Adding routings'))
  const result = await addRouting(paths)
  if (result.stderr) console.log(result.stderr)
  Logger.successCheck('successfully updated routings')
}

const findMethod = async (methodName: string) => {
  const { routing } = await readOrCreateConfig()
  const method = routing.find((routing) => routing.methodName === methodName)
  if (!method) return null
  return method
}
