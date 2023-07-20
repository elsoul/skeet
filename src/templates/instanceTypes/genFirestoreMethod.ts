import { FUNCTIONS_PATH } from '@/lib'
import { toCamelCase } from '@/utils/string'

export const genFirestoreMethod = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/firestore/${pascalMethodName}.ts`
  const body = `import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'

export const ${pascalMethodName} = onDocumentCreated(
  firestoreDefaultOption('User/{userId}'),
  (event) => {
    console.log(\`${pascalMethodName} triggered!\`)
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
