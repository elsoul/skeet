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
  await setGcloudProject(app.projectId)
  const files = await getHttpRoutings()
  const paths = []
  const spinner = await Logger.syncSpinner('syncRoutings...')
  for (const file of files) {
    for (const path of file.httpEndpoints) {
      const kebab = convertToKebabCase(path)
      const functionInfo = await getFunctionInfo(kebab)
      await addBackendSetup(kebab)
      const pathString = `/${file.functionName}/${kebab}=${functionInfo.backendService}`
      paths.push(pathString)
    }
  }
  if (app.template.includes('GraphQL')) {
    const graphqlInfo = await getFunctionInfo('graphql')
    const graphqlPath = `/graphql=${graphqlInfo.backendService}`
    paths.push(graphqlPath)
  }
  const { pathMatcherName } = await getNetworkConfig(app.projectId, app.name)
  await addRounting(pathMatcherName, paths)
  spinner.stop()
}
