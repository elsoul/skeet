import { FUNCTIONS_PATH } from '@/lib'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'

export const genPubSubMethod = (functionsName: string, methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/pubsub/${camelMethodName}.ts`
  const body = `import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { parsePubSubMessage } from '@/lib/pubsub'
import { ${pascalMethodName}Params } from '@common/types/pubsub/${camelMethodName}Params'

export const ${camelMethodName}Topic = '${camelMethodName}'

export const ${camelMethodName} = onMessagePublished(
  pubsubDefaultOption(${camelMethodName}Topic),
  async (event) => {
    try {
      const pubsubObject = parsePubSubMessage<${pascalMethodName}Params>(event)
      console.log({ status: 'success', topic: ${camelMethodName}Topic, event, pubsubObject })
    } catch (error) {
      console.error({ status: 'error', message: String(error) })
    }
  }
)`
  return {
    filePath,
    body,
  }
}
