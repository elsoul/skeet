import {
  onCall,
  CallableRequest,
  HttpsError,
} from 'firebase-functions/v2/https'
import { onCallOption } from '../options/onCallOptions'
import {
  onCallExampleParams,
  onCallExampleResponse,
} from '@common/types/onCall/onCallExampleTypes'

export const onCallExample = onCall(
  { ...onCallOption },
  async (request: CallableRequest<onCallExampleParams>) => {
    try {
      if (!request.auth) {
        throw new HttpsError(
          'failed-precondition',
          'The function must be ' + 'called while authenticated.',
        )
      }
      const uid = request.auth.uid
      return {
        status: 'success',
        message: 'Hello ' + uid,
      } as onCallExampleResponse
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
      return { status: 'error', message: String(error) }
    }
  },
)
