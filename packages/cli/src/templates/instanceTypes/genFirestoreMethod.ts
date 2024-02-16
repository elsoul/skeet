import { FUNCTIONS_PATH } from '@/lib'
import { toCamelCase } from '@skeet-framework/utils'

export const genFirestoreMethod = (
  functionsName: string,
  methodName: string,
) => {
  const camelMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/firestore/${camelMethodName}.ts`
  const body = `import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'

export const ${camelMethodName} = onDocumentCreated(
  firestoreDefaultOption('User/{userId}'),
  (event) => {
    console.log(\`${camelMethodName} triggered!\`)
    try {
      console.log(event.params)
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)`
  return {
    filePath,
    body,
  }
}
