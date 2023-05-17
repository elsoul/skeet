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
  for await (const functionInfo of files) {
    try {
      await addBackendSetup(functionInfo.functionName)
      const res = await addRounting(functionInfo.functionName, paths)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
}
