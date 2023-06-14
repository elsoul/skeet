import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toPascalCase } from './genPubSubMethod'

export const genFirestoreMethod = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toPascalCase(methodName)
  const firestoreMethodName = `on${pascalMethodName}`
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/firestore/${firestoreMethodName}.ts`
  const body = `import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'

export const ${firestoreMethodName} = onDocumentCreated(
  firestoreDefaultOption('User/{userId}'),
  (event) => {
    console.log(\`${firestoreMethodName} triggered!\`)
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
