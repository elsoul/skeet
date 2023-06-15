import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toPascalCase } from './genPubSubMethod'

export const genPubSubMethodParams = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toPascalCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/types/pubsub/${pascalMethodName}Params.ts`
  const body = `export type ${pascalMethodName}Params = {
  name?: string
}
  `
  return {
    filePath,
    body,
  }
}
