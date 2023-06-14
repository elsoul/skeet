import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genPubSubMethod = async (
  functionsName: string,
  methodName: string
) => {
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/pubsub/${methodName}.ts`
  const body = `import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'

export const TOPIC_NAME = '${methodName}'

export const ${methodName} = onMessagePublished(
  pubsubDefaultOption(TOPIC_NAME),
  async (event) => {
    try {
      console.log({ status: 'success', topic: TOPIC_NAME, event })
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
