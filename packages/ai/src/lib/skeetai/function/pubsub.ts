export const pubsub = `import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { parsePubSubMessage } from '@/lib/pubsub'
import { <functionName>Params } from '@/types/pubsub/<functionName>Params'

export const <functionName>Topic = '<functionName>'

export const <functionName> = onMessagePublished(
  pubsubDefaultOption(<functionName>Topic),
  async (event) => {
    try {
      const pubsubObject = parsePubSubMessage<<functionName>Params>(event)
      <yourScript>
      console.log({ status: 'success', topic: <functionName>Topic, event, pubsubObject })
    } catch (error) {
      console.error({ status: 'error', message: String(error) })
    }
  }
)`
