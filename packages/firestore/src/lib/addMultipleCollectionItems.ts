import { createCollectionRef } from './createCollectionRef'
import { DocumentData, Firestore, WriteResult } from 'firebase-admin/firestore'

import { serverTimestamp } from './serverTimestamp'

/**
 * Adds multiple documents to the specified collection in Firestore.
 * This function supports batched writes, and if the number of items exceeds the maximum batch size (500),
 * it will split the items into multiple batches and write them sequentially.
 *
 * @param db - The instance of the Firestore database to use.
 * @param collectionPath - The path of the collection to which the documents will be added.
 * @param items - An array of document data to be added.
 *
 * @returns An array of WriteResult arrays corresponding to each batch.
 *
 * @throws Throws an exception with an error message if an error occurs.
 *
 * @example
 * ```typescript
 * import { getFirestore } from 'firebase-admin/firestore'
 * import { applicationDefault, initializeApp } from 'firebase-admin/app'
 * import { adds } from '@skeet-framework/firestore'
 *
 * const firebaseApp = initializeApp({
 *  credential: applicationDefault(),
 * })
 * export const db = getFirestore(firebaseApp)
 * const users: User[] = [
 *   { name: "John Doe", age: 30 },
 *   { name: "Jane Smith", age: 25 },
 *   // ... more users ...
 * ];
 *
 * async function run() {
 *   try {
 *     const path = 'Users'
 *     const results = await adds<User>(db, path, users);
 *     console.log(`Added ${users.length} users in ${results.length} batches.`);
 *   } catch (error) {
 *     console.error(`Error adding documents: ${error}`);
 *   }
 * }
 *
 * run();
 * ```
 */
export const addMultipleCollectionItems = async <T extends DocumentData>(
  db: Firestore,
  collectionPath: string,
  items: T[],
): Promise<WriteResult[][]> => {
  const MAX_BATCH_SIZE = 500

  const chunkedItems =
    items.length > 500 ? chunkArray(items, MAX_BATCH_SIZE) : [items]

  const batchResults: WriteResult[][] = []

  for (const chunk of chunkedItems) {
    try {
      const batch = db.batch()
      const collectionRef = createCollectionRef<T>(db, collectionPath)

      chunk.forEach((item) => {
        const docRef = collectionRef.doc()
        batch.set(docRef, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      })

      const writeResults = await batch.commit()
      batchResults.push(writeResults)
    } catch (error) {
      throw new Error(`Error adding a batch of documents: ${error}`)
    }
  }

  return batchResults
}

/**
 * Helper function to divide an array into chunks of a specified size.
 *
 * @param array - The array to be divided.
 * @param size - The size of each chunk.
 *
 * @returns An array of chunked arrays.
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunked = []
  let index = 0
  while (index < array.length) {
    chunked.push(array.slice(index, size + index))
    index += size
  }
  return chunked
}
