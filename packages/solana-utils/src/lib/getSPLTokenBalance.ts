import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
  TokenAccountsFilter,
} from '@solana/web3.js'
/**
 * Fetches the balance of a specified SPL token for a given wallet address.
 *
 * @param rpcUrl - The URL of the Solana RPC endpoint.
 * @param ownerAddress - The public key of the wallet owner.
 * @param mintAddress - The mint address of the SPL token.
 * @returns The balance of the SPL token in the specified wallet.
 *
 * @example
 * ```typescript
 * const rpcUrl = 'https://rpc.helius.xyz/?api-key=<API_KEY>'
 * const ownerAddress = 'EPiCHbeCzokXifRK6m91uwFM5A5XVoS6cgwM2JuLXVdC'
 * const mintAddress = 'CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP'
 *
 * const result = await getSPLTokenBalance(rpcUrl, ownerAddress, mintAddress)
 * console.log(result)
 * ```
 */
export const getSPLTokenBalance = async (
  rpcUrl: string,
  ownerAddress: string,
  mintAddress: string,
): Promise<number> => {
  const connection = new Connection(rpcUrl, 'confirmed')
  const ownerPublicKey = new PublicKey(ownerAddress)
  console.log(ownerPublicKey)
  const filters: TokenAccountsFilter = {
    mint: new PublicKey(mintAddress), //size of account (bytes)
  }

  const parsedTokenAccounts = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(ownerAddress),
    filters,
  )
  console.log(parsedTokenAccounts)

  if (!parsedTokenAccounts.value.length) {
    return 0
  }

  const accountInfo = parsedTokenAccounts.value[0].account.data.parsed.info
  return accountInfo.tokenAmount.uiAmount
}
