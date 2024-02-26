import { firestore } from 'firebase-admin';
/**
 * Retrieves a document from Firestore based on the provided document reference.
 *
 * @param dataRef - The document reference pointing to the desired Firestore document.
 *
 * @returns The data of the document as an object of type T or null if the document does not exist.
 *
 * @example
 * ```typescript
 * import { firestore } from 'firebase-admin'
 * import * as admin from 'firebase-admin'
 * import { get } from '@skeet-framework/firestore'
 *
 * const db = admin.firestore();
 *
 * async function run() {
 *   try {
 *     const db = admin.firestore();
 *     const path = 'Users'
 *     const id = 'user123'
 *     const user = await get<User>(db, path, id)
 *     console.log(`Retrieved user: ${user.name}, age: ${user.age}`)
 *   } catch (error) {
 *     console.error(`Error retrieving document: ${error}`)
 *   }
 * }
 *
 * run();
 * ```
 */
export declare const getCollectionItem: <T>(db: firestore.Firestore, collectionPath: string, docId: string) => Promise<T | null>;
