import { getHTTPRoutingFiles } from '@/lib/getHttpRountings'
import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import * as cli from 'cli-table3'

export const listHttps = async () => {
  const https = await getHTTPRoutingFiles()
  const table = new cli.default({
    head: ['Function', 'Endpoint', 'ParamsPath'],
    style: {
      head: ['blue'], //disable colors in header cells
      border: [], //disable colors for the border
    },
  })
  let functionsEndpoints: string[][] = []
  for await (const file of https) {
    for await (const path of file.httpEndpoints) {
      const endpoint = `${path}`
      const paramsPath = `${FUNCTIONS_PATH}/${file.functionName}/src/types/http/${path}Params.ts`
      functionsEndpoints.push([file.functionName, endpoint, paramsPath])
    }
  }
  table.push(...functionsEndpoints)
  console.log(table.toString())
}
