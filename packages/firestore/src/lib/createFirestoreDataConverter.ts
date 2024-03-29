import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase-admin/firestore'

export const createFirestoreDataConverter = <
  T extends DocumentData,
>(): FirestoreDataConverter<T> => {
  return {
    toFirestore(data: T): DocumentData {
      return data
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return snapshot.data() as T
    },
  }
}
