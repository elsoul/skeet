import { firestore } from 'firebase-admin'

export const createFirestoreDataConverter = <
  T extends firestore.DocumentData
>(): firestore.FirestoreDataConverter<T> => {
  return {
    toFirestore(data: T): firestore.DocumentData {
      return data
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): T {
      return snapshot.data() as T
    },
  }
}
