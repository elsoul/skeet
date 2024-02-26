import { firestore } from 'firebase-admin';
export declare const createFirestoreDataConverter: <T extends firestore.DocumentData>() => firestore.FirestoreDataConverter<T>;
