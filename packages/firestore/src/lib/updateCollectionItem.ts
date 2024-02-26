import { firestore } from 'firebase-admin'
import { createFirestoreDataConverter } from './createFirestoreDataConverter'
import { serverTimestamp } from './serverTimestamp'

/**
 * Updates the specified document in the provided Firestore collection with the given data.
 *
 * @param db - The instance of the Firestore database to use.
 * @param collectionPath - The path of the collection containing the document to be updated.
 * @param docId - The ID of the document to be updated.
 * @param params - The data to update the document with.
 *
 * @returns A boolean indicating the success of the update operation.
 *
 * @throws Throws an exception with an error message if an error occurs.
 *
 * @example
 * ```typescript
 * import { firestore } from 'firebase-admin'
 * import { update } from '@skeet-framework/firestore'
 *
 * const db = firestore();
 * const updatedData: firestore.UpdateData<User> = {
 *   age: 31
 * };
 *
 * async function run() {
 *   try {
 *     const path = 'Users'
 *     const docId = '123456'; // Assuming this ID exists in the Users collection.
 *     const success = await update<User>(db, path, docId, updatedData);
 *     if (success) {
 *       console.log(`Document with ID ${docId} updated successfully.`);
 *     }
 *   } catch (error) {
 *     console.error(`Error updating document: ${error}`);
 *   }
 * }
 *
 * run();
 * ```
 */
export const updateCollectionItem = async <T extends firestore.DocumentData>(
  db: firestore.Firestore,
  collectionPath: string,
  docId: string,
  params: firestore.UpdateData<T>
): Promise<boolean> => {
  try {
    const docRef = db
      .collection(collectionPath)
      .doc(docId)
      .withConverter(createFirestoreDataConverter<T>())
    await docRef.update({ ...params, updatedAt: serverTimestamp() })
    return true
  } catch (error) {
    throw new Error(`Error updating document with ID ${docId}: ${error}`)
  }
}
