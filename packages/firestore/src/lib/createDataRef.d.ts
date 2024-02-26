import { firestore } from 'firebase-admin';
export declare const createDataRef: <T extends firestore.DocumentData>(db: firestore.Firestore, collectionPath: string) => firestore.DocumentReference<T>;
