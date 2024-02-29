export const firestore = `import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'

export const <functionName> = onDocumentCreated(
  firestoreDefaultOption('User/{userId}'),
  (event) => {
    console.log(\`<functionName> triggered!\`)
    try {
      <yourScript>
      console.log(event.params)
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)`
