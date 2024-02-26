import { firestore } from 'firebase-admin'
import { createFirestoreDataConverter } from './createFirestoreDataConverter'
import { DocumentData } from 'firebase/firestore'

export const createCollectionRef = <T extends DocumentData>(
  db: firestore.Firestore,
  collectionPath: string
) => {
  return db
    .collection(collectionPath)
    .withConverter(createFirestoreDataConverter<T>())
}
