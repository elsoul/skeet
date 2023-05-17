import { getHTTPRoutingFiles } from '@/lib/getHttpRountings'
import { getFunctionInfo } from '@/lib/getSkeetConfig'
import { convertToKebabCase } from '@/utils/string'
import { addRounting } from '../add'
import { addBackendSetup } from '../add/addBackendSetup'

export const syncRoutings = async () => {
  const files = await getHTTPRoutingFiles()
  const paths = []
  for (const file of files) {
    for (const path of file.httpEndpoints) {
      const kebab = convertToKebabCase(path)
      const functionInfo = await getFunctionInfo(kebab)
      const pathString = `/${file.functionName}/${kebab}=${functionInfo.backendService}`
      paths.push(pathString)
    }
  }
  for (const file of files) {
    for (const path of file.httpEndpoints) {
      const kebab = convertToKebabCase(path)
      await addBackendSetup(kebab)
      await addRounting(kebab, paths)
    }
  }
}
