import { Connection, TransactionSignature } from '@solana/web3.js'
import {
  SPLTransferHistoryResponse,
  SolTransferDetailsResponse,
  SolanaTransaction,
  TokenExchange,
} from '..'

/**
 * Fetches the details of a transaction, specifically the token transfer details.
 *
 * @param rpcUrl - The URL of the Solana RPC endpoint.
 * @param signature - The transaction signature.
 * @returns {Promise<SolTransferDetailsResponse>} - A promise that resolves with the token transfer details.
 *
 * @example
 * ```typescript
 * const rpcUrl = 'https://api.mainnet-beta.solana.com';
 * const signature = '5verv...'; // Example transaction signature
 *
 * const transferDetails = await getSolTransferDetails(rpcUrl, signature);
 * console.log(transferDetails);
 * ```
 */
export const getSolTransferDetails = async (
  rpcUrl: string,
  signature: TransactionSignature,
) => {
  try {
    const connection = new Connection(rpcUrl)

    const transactionDetails = (await connection.getParsedTransaction(
      signature,
    )) as unknown as SolanaTransaction

    const tokenTransferDetails =
      transactionDetails.transaction.message.instructions.find(
        (instruction) => instruction?.parsed?.type === 'transfer',
      )?.parsed?.info

    return tokenTransferDetails as SolTransferDetailsResponse
  } catch (error) {
    throw new Error(`getSolTransferDetails: ${error}`)
  }
}
