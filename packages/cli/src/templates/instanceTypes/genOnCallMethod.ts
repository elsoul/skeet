import { FUNCTIONS_PATH } from '@/lib'
import { toPascalCase } from '@skeet-framework/utils'

export const genOncallMethod = (functionsName: string, methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/onCall/${methodName}.ts`
  const body = `import {
  onCall,
  CallableRequest,
  HttpsError,
} from 'firebase-functions/v2/https'
import { onCallOption } from '../options/onCallOptions'
import {
  OnCall${pascalMethodName}Params,
  OnCall${pascalMethodName}Response,
} from '@common/types/onCall/onCall${pascalMethodName}Types'

export const onCall${pascalMethodName} = onCall(
  { ...onCallOption },
  async (request: CallableRequest<OnCall${pascalMethodName}Params>) => {
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
      } as OnCall${pascalMethodName}Response
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
      return { status: 'error', message: String(error) }
    }
  },
)
`
  return {
    filePath,
    body,
  }
}
