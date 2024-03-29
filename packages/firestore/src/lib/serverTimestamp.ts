import { FieldValue } from 'firebase-admin/firestore'

export const serverTimestamp = () => {
  return FieldValue.serverTimestamp()
}
