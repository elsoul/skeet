export const auth = `import * as functions from 'firebase-functions/v1'
import { authDefaultOption } from '@/routings'
import skeetConfig from '../../../skeetOptions.json'
const region = skeetConfig.region

export const <functionName> = functions
  .runWith(authDefaultOption)
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      <yourScript>
      console.log({ status: 'success', user })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })`
