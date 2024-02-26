import { getNftsByWalletAddress } from './getNftsByWalletAddress'
/**
 * Retrieves the NFTs owned by a specific wallet address that belong to a specified collection.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} userWalletAddress - The wallet address of the user.
 * @param {string} collectionAddress - The address of the NFT collection.
 * @returns {Promise<string[]>} - A promise that resolves with an array of NFT mint addresses.
 * @throws {Error} - Throws an error if unable to fetch NFTs for the given address and collection.
 *
 * @example
 * ```
 * const run = async () => {
 *   const solanaEndpoint = 'https://api.mainnet-beta.solana.com';
 *   const walletAddress = 'YourWalletAddressHere';
 *   const collectionMintAddress = 'CollectionMintAddressHere';
 *
 *   try {
 *     const nftAddresses = await getNftsByWalletAddressAndCollectionMint(
 *       solanaEndpoint,
 *       walletAddress,
 *       collectionMintAddress
 *     );
 *     console.log('NFT Addresses in Collection:', nftAddresses);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const getNftsByWalletAddressAndCollectionMint = async (
  endpoint: string,
  userWalletAddress: string,
  collectionAddress: string,
) => {
  try {
    const ownerNFTs = await getNftsByWalletAddress(endpoint, userWalletAddress)
    const collectionNFTs = ownerNFTs.filter((nft) => {
      const collection: any = nft.metadata.collection
      if (collection.__option === 'Some') {
        if (collection.value.key === collectionAddress) {
          return collection.value.key
        }
      }
    })
    const nftAddresses = collectionNFTs.map((nft) => {
      return nft.metadata.mint
    })
    return nftAddresses as string[]
  } catch (error) {
    throw new Error(`Failed to fetch NFTs for address: ${userWalletAddress}`)
  }
}
