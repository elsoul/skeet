import { Connection } from '@solana/web3.js'
/**
 * Retrieves the date and time corresponding to a given Solana slot number.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {number} slot - The Solana slot number for which to retrieve the timestamp.
 * @returns {Promise<Date>} - A promise that resolves to a Date object representing the timestamp for the given slot.
 * @throws {Error} - Throws an error if unable to fetch the block time for the given slot.
 *
 * @example
 * ```
 * const endpoint = 'https://api.mainnet-beta.solana.com';
 * const slot = 123456789; // Example slot number
 *
 * try {
 *   const timestamp = await getTimestampFromSlot(endpoint, slot);
 *   console.log('Date for slot:', timestamp);
 * } catch (error) {
 *   console.error('Error getting date for slot:', error);
 * }
 * ```
 */
export async function getTimestampFromSlot(
  endpoint: string,
  slot: number,
): Promise<Date> {
  try {
    const connection = new Connection(endpoint)
    const slotTime = (await connection.getBlockTime(slot)) || 0

    const date = new Date(slotTime * 1000)

    return date
  } catch (error) {
    console.error(`getTimestampFromSlot: ${error}`)
    throw new Error(`getTimestampFromSlot: ${error}`)
  }
}
