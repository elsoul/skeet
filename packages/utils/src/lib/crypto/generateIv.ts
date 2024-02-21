import { randomBytes } from 'crypto'
import { outputEncoding } from './crypto'

/**
 * Generates a random initialization vector (IV) for encryption.
 *
 * @returns The generated initialization vector as a base64-encoded string.
 *
 * @example
 * const iv = generateIv();
 * console.log(iv); // Random base64-encoded initialization vector
 */
export const generateIv = (): string => {
  try {
    const iv = randomBytes(16)
    return Buffer.from(iv).toString(outputEncoding)
  } catch (error) {
    throw new Error(`generateIv: ${error}`)
  }
}
