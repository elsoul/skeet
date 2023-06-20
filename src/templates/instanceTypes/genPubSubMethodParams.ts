import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toCamelCase, toPascalCase } from '@/utils/string'

export const genPubSubMethodParams = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/types/pubsub/${camelMethodName}Params.ts`
  const body = `export type ${pascalMethodName}Params = {
  name?: string
}
  `
  return {
    filePath,
    body,
  }
}
