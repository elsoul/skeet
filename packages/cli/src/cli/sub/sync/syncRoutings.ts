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
import { readdir } from 'fs/promises'
import path from 'path'

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
  if (app.template.includes('GraphQL')) {
    const methodName = 'graphql'
    const graphqlInfo = getFunctionInfo(methodName)
    const graphqlRouting = await findMethod(methodName)
    const securityPolicyName = graphqlRouting
      ? graphqlRouting.securityPolicyName
      : null
    await addBackendSetup(methodName, securityPolicyName)
    const graphqlPath = `/graphql=${graphqlInfo.backendService}`
    paths.push(graphqlPath)
  }
  if (app.template.includes('SQL')) {
    for (const methodName of await sqlDirs()) {
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

const sqlDirs = async () => {
  const dirs = await readdir('sql', { withFileTypes: true })
  return dirs
    .filter((item) => item.isDirectory())
    .map((item) => {
      const dirPath = path.join('sql', item.name)
      const methodName = dirPath.replace('/', '-')
      return methodName
    })
}
