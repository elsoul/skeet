import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toPascalCase } from './genPubSubMethod'

export const genAuthMethod = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toPascalCase(methodName)
  const authMethodName = `auth${pascalMethodName}`
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/auth/${authMethodName}.ts`
  const body = `import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import dotenv from 'dotenv'
dotenv.config()

const region = process.env.REGION || 'europe-west6'

export const ${authMethodName} = functions
  .runWith(authPublicOption)
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
