import { firestore } from 'firebase-admin';
import { DocumentData } from 'firebase/firestore';
export declare const createCollectionRef: <T extends DocumentData>(db: firestore.Firestore, collectionPath: string) => firestore.CollectionReference<T>;
