import { firestore } from 'firebase-admin'
import { createFirestoreDataConverter } from './createFirestoreDataConverter'

export const createDataRef = <T extends firestore.DocumentData>(
  db: firestore.Firestore,
  collectionPath: string
) => {
  return db.doc(collectionPath).withConverter(createFirestoreDataConverter<T>())
}
