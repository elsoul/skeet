import { FUNCTIONS_PATH } from '@/lib'
import { toCamelCase } from '@skeet-framework/utils'

export const genAuthMethod = (functionsName: string, methodName: string) => {
  const camelMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/auth/${camelMethodName}.ts`
  const body = `import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings/options'
import skeetConfig from '../../../skeetOptions.json'
const region = skeetConfig.region

export const ${camelMethodName} = functions
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
