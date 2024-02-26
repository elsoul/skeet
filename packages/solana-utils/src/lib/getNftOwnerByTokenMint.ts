import { fetchAllDigitalAssetWithTokenByMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import { PublicKey } from '@solana/web3.js'
/**
 * Retrieves the owner of an NFT by its token mint address.
 *
 * @param {string} nftAddress - The mint address of the NFT.
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @returns {Promise<string>} - A promise that resolves with the owner's address.
 * @throws {Error} - Throws an error if unable to fetch the NFT metadata or owner.
 *
 * @example
 * ```
 * const run = async () => {
 *   const nftMintAddress = 'Fg6...sdf';
 *   const solanaEndpoint = 'https://api.mainnet-beta.solana.com';
 *   try {
 *     const result = await getNftOwnerByTokenMint(nftMintAddress, solanaEndpoint);
 *     console.log('NFT Owner:', result);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const getNftOwnerByTokenMint = async (
  nftAddress: string,
  endpoint: string,
) => {
  try {
    const publicKey = new PublicKey(nftAddress)
    const umi = createUmi(endpoint)
    const nftMetadata = await fetchAllDigitalAssetWithTokenByMint(
      umi,
      fromWeb3JsPublicKey(publicKey),
    )
    return nftMetadata[0].token.owner.toString()
  } catch (error) {
    throw new Error(`getNftOwner: ${error}`)
  }
}
