import { firestore } from 'firebase-admin'

export const serverTimestamp = () => {
  return firestore.FieldValue.serverTimestamp()
}
