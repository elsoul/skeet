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

export const syncRoutings = async () => {
  const { app } = importConfig()
  setGcloudProject(app.projectId)
  const files = await getHttpRoutings()
  const paths = []
  const spinner = await Logger.syncSpinner('syncRoutings...')
  for (const file of files) {
    for (const path of file.httpEndpoints) {
      const kebab = convertToKebabCase(path)
      const functionInfo = getFunctionInfo(kebab)
      addBackendSetup(kebab)
      const pathString = `/${file.functionName}/${kebab}=${functionInfo.backendService}`
      paths.push(pathString)
    }
  }
  if (app.template.includes('GraphQL')) {
    const graphqlInfo = getFunctionInfo('graphql')
    const graphqlPath = `/graphql=${graphqlInfo.backendService}`
    paths.push(graphqlPath)
  }
  if (app.template.includes('SQL')) {
    const sqlInfo = getFunctionInfo('sql')
    addBackendSetup('sql')
    const sqlPath = `/sql/=${sqlInfo.backendService}`
    paths.push(sqlPath)
  }
  const { pathMatcherName } = getNetworkConfig(app.projectId, app.name)
  await addRounting(pathMatcherName, paths)
  spinner.stop()
}
