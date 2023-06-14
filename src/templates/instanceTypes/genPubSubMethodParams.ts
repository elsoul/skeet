import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genPubSubMethodParams = async (
  functionsName: string,
  methodName: string
) => {
  const firstChar = methodName.charAt(0).toUpperCase()
  const capitalizedMethodName = firstChar + methodName.slice(1)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/types/pubsub/pubsub${methodName}Params.ts`
  const body = `export type PubSub${capitalizedMethodName}Params = {
  name?: string
}
  `
  return {
    filePath,
    body,
  }
}
