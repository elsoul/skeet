import { getHTTPRoutingFiles } from '@/lib/getHttpRountings'
import { getFunctionInfo, getNetworkConfig } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'
import { importConfig } from '@/index'
import { Logger } from '@/lib/logger'
import { setGcloudProject, addRounting, addBackendSetup } from '@/cli'

export const syncRoutings = async () => {
  const { app } = await importConfig()
  await setGcloudProject(app.projectId)
  const files = await getHTTPRoutingFiles()
  const paths = []
  Logger.sync('⏳ syncRoutings...')
  for (const file of files) {
    for (const path of file.httpEndpoints) {
      const kebab = convertToKebabCase(path)
      const functionInfo = await getFunctionInfo(kebab)
      await addBackendSetup(kebab)
      const pathString = `/${file.functionName}/${kebab}=${functionInfo.backendService}`
      paths.push(pathString)
    }
  }
  const config = await importConfig()
  const { pathMatcherName } = await getNetworkConfig(
    config.app.projectId,
    config.app.name
  )
  await addRounting(pathMatcherName, paths)
}
