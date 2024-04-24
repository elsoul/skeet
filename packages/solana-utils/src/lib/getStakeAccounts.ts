import { ParsedStakeAccount } from '@/solanaUtilsTypes'
import {
  Connection,
  PublicKey,
  StakeProgram,
  ParsedAccountData,
} from '@solana/web3.js'

/**
 * Fetches the list of stake accounts associated with a given wallet address.
 *
 * @param {string} walletAddress - The wallet address to query for stake accounts.
 * @param {string} rpcUrl - The Solana RPC endpoint URL.
 * @returns {Promise<ParsedStakeAccount[]>} - A promise that resolves with an array of stake accounts.
 *
 * @example
 * ```
 * const run = async () => {
 *   const endpoint = 'https://api.mainnet-beta.solana.com';
 *   const walletAddress = '<your-authority-keypair>';
 *   const result = await getStakeAccounts(walletAddress, endpoint);
 *   console.log(inspect(result, { depth: null, colors: true }));
 * };
 *
 * run();
 * ```
 */
export async function getStakeAccounts(walletAddress: string, rpcUrl: string) {
  try {
    const connection = new Connection(rpcUrl)
    const walletPublicKey = new PublicKey(walletAddress)

    // Fetch all stake accounts associated with the wallet address
    const stakeAccounts = await connection.getParsedProgramAccounts(
      StakeProgram.programId,
      {
        filters: [
          {
            memcmp: {
              offset: 12, // Offset for the Stake Authorized struct's staker field
              bytes: walletPublicKey.toBase58(),
            },
          },
        ],
      },
    )

    return stakeAccounts.map((account) => {
      const data = account.account.data as ParsedAccountData
      return {
        publicKey: account.pubkey.toBase58(),
        account: data.parsed as ParsedStakeAccount,
      }
    })
  } catch (error) {
    console.error('Error fetching stake accounts:', error)
    throw error
  }
}
