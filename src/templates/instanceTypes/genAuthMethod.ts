import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genAuthMethod = async (
  functionsName: string,
  methodName: string
) => {
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/firestore/${methodName}.ts`
  const body = `import * as functions from 'firebase-functions/v1'
  import { authPublicOption } from '@/routings'
  import dotenv from 'dotenv'
  dotenv.config()
  
  const region = process.env.REGION || 'europe-west6'
  
  export const ${methodName} = functions
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
