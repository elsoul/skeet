import { DocumentData, Firestore } from 'firebase-admin/firestore'
import { createFirestoreDataConverter } from './createFirestoreDataConverter'

export const createDataRef = <T extends DocumentData>(
  db: Firestore,
  collectionPath: string,
) => {
  return db.doc(collectionPath).withConverter(createFirestoreDataConverter<T>())
}
