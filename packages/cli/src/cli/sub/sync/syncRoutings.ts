import {
  getFunctionInfo,
  getHttpRoutings,
  getNetworkConfig,
  importConfig,
  Logger,
  setGcloudProject,
} from '@/lib'
import { convertToKebabCase } from '@/utils/string'
import { addBackendSetup } from '../add/addBackendSetup'
import { addRounting } from '../add/routing'
import { getSQLs } from '@/lib/files/getSQLs'

export const syncRoutings = async () => {
  const { app } = await importConfig()
  await setGcloudProject(app.projectId)
  const files = await getHttpRoutings()
  const paths = []
  const spinner = Logger.syncSpinner('syncRoutings...')
  for (const file of files) {
    for (const methoName of file.httpEndpoints) {
      const methodNameKebab = convertToKebabCase(methoName)
      const method = await findMethod(methoName)
      let securityPolicyName = null
      if (method) {
        securityPolicyName = method.securityPolicyName
      }
      const functionInfo = getFunctionInfo(methodNameKebab)
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
  const { pathMatcherName } = getNetworkConfig(app.projectId, app.name)
  await addRounting(pathMatcherName, paths)
  spinner.stop()
}

const findMethod = async (methodName: string) => {
  const { routings } = await importConfig()
  const method = routings.find((routing) => routing.methodName === methodName)
  if (!method) return null
  return method
}
