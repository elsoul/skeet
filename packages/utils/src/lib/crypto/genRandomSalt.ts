import { randomBytes } from 'crypto'

/**
 * Generates a random salt for key derivation.
 *
 * @param bytes - The number of bytes for the generated salt. Default is 16 bytes.
 * @returns The generated salt as a hexadecimal string.
 *
 * @example
 * const salt = generateRandomSalt();
 * console.log(salt); // Random hexadecimal salt
 */
export function generateRandomSalt(bytes = 16): string {
  try {
    return randomBytes(bytes).toString('hex')
  } catch (error) {
    throw new Error(`generateRandomSalt: ${error}`)
  }
}
