import { NftMetadata } from '../solanaUtilsTypes'
import { fetchDigitalAssetWithTokenByMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import { PublicKey } from '@solana/web3.js'
import fetch from 'node-fetch'
/**
 * Retrieves the attributes of an NFT by its mint address.
 *
 * @param {string} nftAddress - The mint address of the NFT.
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @returns {Promise<NftMetadata>} - A promise that resolves with the NFT metadata.
 * @throws {Error} - Throws an error if unable to fetch the NFT metadata.
 *
 * @example
 * ```
 * const run = async () => {
 *   try {
 *     const nftData = await getNftAttributes(
 *       'EggwWJZsCjSY7f36zHHevBmuSyTDHzGxVC2PGX5ePsTh',
 *       'https://api.mainnet-beta.solana.com'
 *     );
 *     console.log(nftData);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const getNftAttributes = async (
  nftAddress: string,
  endpoint: string,
) => {
  try {
    const publicKey = new PublicKey(nftAddress)
    const umi = createUmi(endpoint)
    const nftMetadata = await fetchDigitalAssetWithTokenByMint(
      umi,
      fromWeb3JsPublicKey(publicKey),
    )
    const jsonUrl = nftMetadata.metadata.uri
    const json = await getJson(jsonUrl)
    return json
  } catch (error) {
    throw new Error(`getNftAttributes: ${error}`)
  }
}

/**
 * Fetches JSON data from a given URL.
 *
 * @param {string} url - The URL to fetch JSON data from.
 * @returns {Promise<NftMetadata>} - A promise that resolves with the JSON data.
 * @throws {Error} - Throws an error if unable to fetch or parse the JSON data.
 */
export const getJson = async (url: string) => {
  try {
    const res = await fetch(url)
    const json = await res.json()
    return json as NftMetadata
  } catch (error) {
    throw new Error(`getJson: ${error}`)
  }
}
