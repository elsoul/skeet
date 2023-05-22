import { Logger } from '@/lib/logger'
import { genAuthMethod } from './genAuthMethod'
import { genFirestoreMethod } from './genFirestoreMethod'
import { genHttpMethod } from './genHttpMethod'
import { genHttpMethodParams } from './genHttpMethodParams'
import { genPubSubMethod } from './genPubSubMethod'
import { genSchedulerMethod } from './genSchedulerMethod'
import fs from 'fs'

export const genInstanceMethod = async (
  instanceType: string,
  functionsName: string,
  methodName: string
) => {
  try {
    switch (instanceType) {
      case 'auth':
        return await genAuthMethod(functionsName, methodName)
      case 'firestore':
        return await genFirestoreMethod(functionsName, methodName)
      case 'pubsub':
        return await genPubSubMethod(functionsName, methodName)
      case 'scheduler':
        return await genSchedulerMethod(functionsName, methodName)
      default:
        const params = await genHttpMethodParams(functionsName, methodName)
        fs.writeFileSync(params.filePath, params.body)
        Logger.success(`✔️ ${params.filePath} created!`)
        return await genHttpMethod(functionsName, methodName)
    }
  } catch (error) {
    throw new Error(`genInstanceMethod: ${error}`)
  }
}
