import { Timestamp, FieldValue } from '@skeet-framework/firestore'

/**
 * ⚡️ Skeet Framework Sample Models ⚡️
 * This module contains models for Firestore collections.
 * It includes types for 'Hey' and 'HeyChild' along with utility functions.
 * CollectionId & DocumentId are customizable.
 */

/**
 * Collection name for 'Hey'.
 */
export const HeyCN = 'Hey'

/**
 * Collection name for 'HeyChild'.
 */
export const HeyChildCN = 'HeyChild'

/**
 * Type definition for documents in the 'Hey' collection.
 *
 * @collectionId Hey
 * @documentId auto-generated
 * @path ${HeyCN}
 */
export type Hey = {
  /**
   * Unique identifier for the document.
   */
  id?: string

  /**
   * Timestamp for document creation.
   * Can be Firestore Timestamp or server-generated FieldValue.
   */
  createdAt?: Timestamp | FieldValue

  /**
   * Timestamp for the last update of the document.
   * Can be Firestore Timestamp or server-generated FieldValue.
   */
  updatedAt?: Timestamp | FieldValue
}

/**
 * Utility function to generate the Firestore path for a 'HeyChild' document.
 *
 * @param {string} heyId - The ID of the 'Hey' document.
 * @returns {string} The Firestore path for the 'HeyChild' document.
 */
export const getHeyChildPath = (heyId: string) =>
  `${HeyCN}/${heyId}/${HeyChildCN}`

/**
 * Type definition for documents in the 'HeyChild' collection.
 *
 * @collectionId HeyChild
 * @documentId auto-generated
 * @path ${HeyCN}/${HeyId}/${HeyChildCN}
 */
export type HeyChild = {
  /**
   * Unique identifier for the document.
   */
  id?: string

  /**
   * Timestamp for document creation.
   * Can be Firestore Timestamp or server-generated FieldValue.
   */
  createdAt?: Timestamp | FieldValue

  /**
   * Timestamp for the last update of the document.
   * Can be Firestore Timestamp or server-generated FieldValue.
   */
  updatedAt?: Timestamp | FieldValue
}
