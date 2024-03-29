import { DocumentData, Firestore } from 'firebase-admin/firestore'
import { createFirestoreDataConverter } from './createFirestoreDataConverter'

export const createCollectionRef = <T extends DocumentData>(
  db: Firestore,
  collectionPath: string,
) => {
  return db
    .collection(collectionPath)
    .withConverter(createFirestoreDataConverter<T>())
}
