import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genFirestoreMethod = async (
  functionsName: string,
  methodName: string
) => {
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/firestore/${methodName}.ts`
  const body = `import { onDocumentCreated } from 'firebase-functions/v2/firestore'
  import { firestoreDefaultOption } from '@/routings/options'
  
  export const ${methodName} = onDocumentCreated(
    firestoreDefaultOption('User/{userId}'),
    (event) => {
      console.log(\`${methodName} triggered!\`)
      try {
        console.log(event.params)
      } catch (error) {
        console.log({ status: 'error', message: String(error) })
      }
    }
  )
  `
  return {
    filePath,
    body,
  }
}
