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
import { readdirSync } from 'node:fs'
import * as path from 'path'

export const syncRoutings = () => {
  const { app } = importConfig()
  setGcloudProject(app.projectId)
  const files = getHttpRoutings()
  const paths = []
  const spinner = Logger.syncSpinner('syncRoutings...')
  for (const file of files) {
    for (const methoName of file.httpEndpoints) {
      const methodNameKebab = convertToKebabCase(methoName)
      const method = findMethod(methoName)
      let securityPolicyName = null
      if (method) {
        securityPolicyName = method.securityPolicyName
      }
      const functionInfo = getFunctionInfo(methodNameKebab)
      addBackendSetup(methodNameKebab, securityPolicyName)
      const pathString = `/${file.functionName}/${methodNameKebab}=${functionInfo.backendService}`
      paths.push(pathString)
    }
  }
  if (app.template.includes('GraphQL')) {
    const methodName = 'graphql'
    const graphqlInfo = getFunctionInfo(methodName)
    const graphqlRouting = findMethod(methodName)
    const securityPolicyName = graphqlRouting
      ? graphqlRouting.securityPolicyName
      : null
    addBackendSetup(methodName, securityPolicyName)
    const graphqlPath = `/graphql=${graphqlInfo.backendService}`
    paths.push(graphqlPath)
  }
  if (app.template.includes('SQL')) {
    for (const methodName of sqlDirs()) {
      const sqlInfo = getFunctionInfo(methodName)
      const sqlRouting = findMethod(methodName)
      const securityPolicyName = sqlRouting
        ? sqlRouting.securityPolicyName
        : null
      addBackendSetup(methodName, securityPolicyName)
      const sqlPath = `/${methodName}/*=${sqlInfo.backendService}`
      paths.push(sqlPath)
    }
  }
  const { pathMatcherName } = getNetworkConfig(app.projectId, app.name)
  addRounting(pathMatcherName, paths)
  spinner.stop()
}

const findMethod = (methodName: string) => {
  const { routings } = importConfig()
  const method = routings.find((routing) => routing.methodName === methodName)
  if (!method) return null
  return method
}

const sqlDirs = () => {
  return readdirSync('sql', { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => {
      const dirPath = path.join('sql', item.name)
      const methodName = dirPath.replace('/', '-')
      return methodName
    })
}
