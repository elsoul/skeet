import { firestore } from 'firebase-admin'
import { createFirestoreDataConverter } from './createFirestoreDataConverter'

/**
 * Represents a condition for querying Firestore collections.
 */
export type QueryCondition = {
  field?: string
  operator?: firestore.WhereFilterOp
  value?: any
  orderDirection?: firestore.OrderByDirection // "asc" or "desc"
  limit?: number
}

/**
 * Queries the specified collection in Firestore based on the provided conditions
 * and returns an array of documents that match the conditions.
 *
 * @param db - The instance of the Firestore database to use.
 * @param collectionPath - The path of the collection to be queried.
 * @param conditions - An array of conditions to apply to the query.
 *
 * @returns An array of documents from the collection that match the conditions.
 *
 * @throws Throws an exception with an error message if an error occurs.
 *
 * @example
 * ```typescript
 * import { firestore } from 'firebase-admin'
 * import { query } from '@skeet-framework/firestore'
 * const db = firestore();
 *
 * // Simple query to get users over 25 years old
 * const simpleConditions: QueryCondition[] = [
 *   { field: "age", operator: ">", value: 25 }
 * ];
 *
 * // Advanced query to get users over 25 years old, ordered by desc
 * // Limitations: If you include a filter with a range comparison (<, <=, >, >=), your first ordering must be on the same field
 * // So we can't use multiple fields with a range comparison for now.
 * // https://firebase.google.com/docs/firestore/query-data/order-limit-data
 * const advancedConditions: QueryCondition[] = [
 *   { field: 'age', operator: '>', value: 25 },
 *   { field: 'age', orderDirection: 'desc' },
 * ]
 *
 * // Query to get users over 25 years old and limit the results to 5
 * const limitedConditions: QueryCondition[] = [
 *   { field: "age", operator: ">", value: 25 },
 *   { limit: 5 }
 * ];
 *
 * async function run() {
 *   try {
 *     const path = 'Users';
 *
 *     // Using the simple conditions
 *     const usersByAge = await query<User>(db, path, simpleConditions);
 *     console.log(`Found ${usersByAge.length} users over 25 years old.`);
 *
 *     // Using the advanced conditions
 *     const orderedUsers = await query<User>(db, path, advancedConditions);
 *     console.log(`Found ${orderedUsers.length} users over 25 years old, ordered by name.`);
 *
 *     // Using the limited conditions
 *     const limitedUsers = await query<User>(db, path, limitedConditions);
 *     console.log(`Found ${limitedUsers.length} users over 25 years old, limited to 5.`);
 *
 *   } catch (error) {
 *     console.error(`Error querying collection: ${error}`);
 *   }
 * }
 *
 * run();
 * ```
 */
export const queryCollectionItems = async <T extends firestore.DocumentData>(
  db: firestore.Firestore,
  collectionPath: string,
  conditions: QueryCondition[]
): Promise<T[]> => {
  try {
    let query: firestore.Query = db
      .collection(collectionPath)
      .withConverter(createFirestoreDataConverter<T>())

    for (const condition of conditions) {
      if (
        condition.field &&
        condition.operator &&
        condition.value !== undefined
      ) {
        query = query.where(
          condition.field,
          condition.operator,
          condition.value
        )
      }
      if (condition.field && condition.orderDirection) {
        query = query.orderBy(condition.field, condition.orderDirection)
      }
      if (condition.limit !== undefined) {
        query = query.limit(condition.limit)
      }
    }

    const snapshot = await query.get()
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }))
  } catch (error) {
    throw new Error(`Error querying collection: ${error}`)
  }
}
