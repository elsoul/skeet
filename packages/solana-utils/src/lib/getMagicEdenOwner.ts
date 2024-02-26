import {
  Connection,
  GetVersionedTransactionConfig,
  PublicKey,
} from '@solana/web3.js'

export const MAGIC_EDEN_ADDRESS = '1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix'
/**
 * Retrieves the most recent owner of a minted item on Magic Eden, excluding Magic Eden's address.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} mintAddress - The mint address of the NFT or asset.
 * @returns {Promise<string | null>} - A promise that resolves with the address of the most recent owner, or null if not found.
 * @throws {Error} - Throws an error if unable to fetch transaction information.
 *
 * @example
 * ```
 * const run = async () => {
 *   const solanaEndpoint = 'https://api.mainnet-beta.solana.com';
 *   const mintAddress = 'MintAddressHere';
 *
 *   try {
 *     const owner = await getMagicEdenOwner(solanaEndpoint, mintAddress);
 *     console.log('Most Recent Owner:', owner);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const getMagicEdenOwner = async (
  endpoint: string,
  mintAddress: string,
) => {
  const mintPublicKey = new PublicKey(mintAddress)
  const connection = new Connection(endpoint)
  const confirmedSignatures =
    await connection.getConfirmedSignaturesForAddress2(mintPublicKey, {
      limit: 3,
    })

  let recentTransfers = []
  for await (const signatureInfo of confirmedSignatures) {
    const config: GetVersionedTransactionConfig = {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    }
    const transaction = await connection.getTransaction(
      signatureInfo.signature,
      config,
    )
    if (!transaction) {
      throw new Error(
        `Failed to fetch transaction for signature: ${signatureInfo.signature}`,
      )
    }
    const { meta } = transaction
    if (!meta) {
      return null
    }
    if (!meta.postTokenBalances) {
      return null
    }
    if (meta.err) continue

    let owner = meta?.postTokenBalances[0]?.owner || null
    if (owner === MAGIC_EDEN_ADDRESS) {
      if (meta.preTokenBalances) {
        owner = meta?.preTokenBalances[0]?.owner || null
      }
    }
    if (!owner) {
      owner = meta?.postTokenBalances[2]?.owner || null
    }
    recentTransfers.push(owner)
  }
  return recentTransfers.filter((transfer) => transfer !== null)[0]
}
