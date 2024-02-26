import { PublicKey } from '@solana/web3.js'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { fetchAllDigitalAssetByOwner } from '@metaplex-foundation/mpl-token-metadata'
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
/**
 * Retrieves all NFTs owned by a specific wallet address on the Solana blockchain.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} userWalletAddress - The wallet address of the user whose NFTs are to be fetched.
 * @returns {Promise<any[]>} - A promise that resolves with an array of NFTs.
 * @throws {Error} - Throws an error if unable to fetch NFTs for the given address.
 *
 * @example
 * ```
 * const run = async () => {
 *   const solanaEndpoint = 'https://api.mainnet-beta.solana.com';
 *   const walletAddress = 'YourWalletAddressHere';
 *
 *   try {
 *     const nfts = await getNftsByWalletAddress(solanaEndpoint, walletAddress);
 *     console.log('NFTs:', nfts);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const getNftsByWalletAddress = async (
  endpoint: string,
  userWalletAddress: string,
) => {
  try {
    const publicKey = new PublicKey(userWalletAddress)
    const umi = createUmi(endpoint)
    const nfts = await fetchAllDigitalAssetByOwner(
      umi,
      fromWeb3JsPublicKey(publicKey),
    )
    return nfts
  } catch (error) {
    throw new Error(`Failed to fetch NFTs for address: ${userWalletAddress}`)
  }
}
