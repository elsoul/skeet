import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genPubSubMethod = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/pubsub/${pascalMethodName}.ts`
  const pubsubParamsName = `${pascalMethodName}Params`
  const pubsubParamsPathName = `${pascalMethodName}Params`
  const body = `import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { parsePubSubMessage } from '@/lib/pubsub'
import { ${pubsubParamsName} } from '@/types/pubsub/${pubsubParamsPathName}'

export const pubsubTopic = '${pascalMethodName}'

export const ${pascalMethodName} = onMessagePublished(
  pubsubDefaultOption(pubsubTopic),
  async (event) => {
    try {
      const pubsubObject = parsePubSubMessage<${pubsubParamsName}>(event)
      console.log({ status: 'success', topic: pubsubTopic, event, pubsubObject })
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

export const toPascalCase = (str: string) => {
  return str
    .split(/(?=[A-Z])|[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export const toCamelCase = (str: string) => {
  return str
    .split(/(?=[A-Z])|[-_\s]/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}
