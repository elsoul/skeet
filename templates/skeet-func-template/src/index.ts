import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import dotenv from 'dotenv'

dotenv.config()
const firebaseApp = initializeApp({
  credential: applicationDefault(),
})
export const db = getFirestore(firebaseApp)

export {
  // This part is automatically generated by Skeet Framework.
  // Please do not edit this part.
  // Skeet Doc: https://skeet.dev
  root,
  authOnCreateUser,
} from '@/routings'
