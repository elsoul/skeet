import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toCamelCase } from './genPubSubMethod'

export const genAuthMethod = async (
  functionsName: string,
  methodName: string
) => {
  const camelMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/auth/${camelMethodName}.ts`
  const body = `import * as functions from 'firebase-functions/v1'
import { authDefaultOption } from '@/routings'
import dotenv from 'dotenv'
dotenv.config()

const region = process.env.REGION || 'europe-west6'

export const ${camelMethodName} = functions
  .runWith(authDefaultOption)
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      console.log({ status: 'success', user })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })`
  return {
    filePath,
    body,
  }
}
