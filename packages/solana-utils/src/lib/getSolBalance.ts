import { Connection, PublicKey } from '@solana/web3.js'
/**
 * Retrieves the SOL balance in lamports for a given Solana public key.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} pubkey - The public key of the account whose balance is to be fetched.
 * @returns {Promise<number>} - A promise that resolves with the number of lamports in the account.
 * @throws {Error} - Throws an error if unable to fetch the account information.
 *
 * @example
 * ```
 * const run = async () => {
 *   const solanaEndpoint = 'https://api.mainnet-beta.solana.com';
 *   const publicKey = 'YourPublicKeyHere';
 *
 *   try {
 *     const balance = await getSolBalance(solanaEndpoint, publicKey);
 *     console.log(`Balance in lamports: ${balance}`);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const getSolBalance = async (endpoint: string, pubkey: string) => {
  try {
    const accountPublicKey = new PublicKey(pubkey)
    const connection = new Connection(endpoint)
    const accountInfo = await connection.getAccountInfo(accountPublicKey)

    if (!accountInfo) {
      throw new Error(`Failed to fetch account info for address: ${pubkey}`)
    }
    return accountInfo.lamports
  } catch (error) {
    throw new Error(`getSolBalance: ${error}`)
  }
}
