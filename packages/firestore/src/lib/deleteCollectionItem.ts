import { Firestore } from 'firebase-admin/firestore'

/**
 * Deletes a document from the specified collection in Firestore.
 *
 * @param db - The instance of the Firestore database to use.
 * @param collectionPath - The path of the collection containing the document to be deleted.
 * @param docId - The ID of the document to be deleted.
 *
 * @returns A boolean indicating the success of the delete operation.
 *
 * @throws Throws an exception with an error message if an error occurs.
 *
 * @example
 * ```typescript
 * import { getFirestore } from 'firebase-admin/firestore'
 * import { applicationDefault, initializeApp } from 'firebase-admin/app'
 * import { remove } from '@skeet-framework/firestore'
 *
 * const firebaseApp = initializeApp({
 *  credential: applicationDefault(),
 * })
 * export const db = getFirestore(firebaseApp)
 *
 * async function run() {
 *   try {
 *     const path = 'Users'
 *     const docId = '123456'; // Assuming this ID exists in the Users collection.
 *     const success = await remove(db, path, docId);
 *     if (success) {
 *       console.log(`Document with ID ${docId} deleted successfully.`);
 *     }
 *   } catch (error) {
 *     console.error(`Error deleting document: ${error}`);
 *   }
 * }
 *
 * run();
 * ```
 */
export const deleteCollectionItem = async (
  db: Firestore,
  collectionPath: string,
  docId: string,
): Promise<boolean> => {
  try {
    const docRef = db.collection(collectionPath).doc(docId)
    await docRef.delete()
    return true
  } catch (error) {
    throw new Error(`Error deleting document with ID ${docId}: ${error}`)
  }
}
