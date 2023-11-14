import { FUNCTIONS_PATH, getHttpRoutings, importConfig } from '@/lib'
import { convertToKebabCase } from '@skeet-framework/utils'
import * as cli from 'cli-table3'

export const listHttps = async () => {
  const { app } = importConfig()
  const https = await getHttpRoutings()
  const table = new cli.default({
    head: ['Function', 'Endpoint', 'ParamsPath'],
    style: {
      head: ['blue'], //disable colors in header cells
      border: [], //disable colors for the border
    },
  })
  const functionsEndpoints: string[][] = []
  for await (const file of https) {
    for await (const path of file.httpEndpoints) {
      let endpoint = `https://${app.region}-${app.fbProjectId}.cloudfunctions.net/${path}`
      if (app.hasLoadBalancer) {
        const kebabcase = convertToKebabCase(path)
        endpoint = `https://${app.lbDomain}/${file.functionName}/${kebabcase}`
      }
      const paramsPath = `${FUNCTIONS_PATH}/${file.functionName}/src/types/http/${path}Params.ts`
      functionsEndpoints.push([file.functionName, endpoint, paramsPath])
    }
  }
  table.push(...functionsEndpoints)
  console.log(table.toString())
}
