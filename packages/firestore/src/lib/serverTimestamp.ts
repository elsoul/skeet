import pkg from 'firebase-admin'
const { firestore } = pkg

export const serverTimestamp = () => {
  return firestore.FieldValue.serverTimestamp()
}
