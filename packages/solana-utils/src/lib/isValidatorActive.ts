import { ValidatorStatusParams } from '@/solanaUtilsTypes'
import * as solanaWeb3 from '@solana/web3.js'
/**
 * Checks whether a validator is active on the Solana network.
 *
 * @param endpoint - The URL of the Solana RPC endpoint.
 * @param voteAccountPubkey - The public key of the validator's vote account.
 * @returns A `ValidatorStatusParams` object containing the validator's public key, activity status, and the reason for that status.
 *
 * @example
 * ```typescript
 * const endpoint = 'https://api.mainnet-beta.solana.com'
 * const voteAccountPubkey = 'ExampleVoteAccountPubkey'
 *
 * const status = await isValidatorActive(endpoint, voteAccountPubkey)
 * console.log(`Validator status: ${JSON.stringify(status)}`)
 * ```
 *
 * @throws Throws an error if there is a problem accessing the network or querying validator status.
 */
export const isValidatorActive = async (
  endpoint: string,
  voteAccountPubkey: string,
) => {
  try {
    const connection = new solanaWeb3.Connection(endpoint, 'confirmed')
    const voteAccounts = await connection.getVoteAccounts()
    const validator = voteAccounts.current.find(
      (v) => v.votePubkey === voteAccountPubkey,
    )

    if (!validator) {
      // Validator is not in the current list, it might be delinquent.
      const delinquentValidator = voteAccounts.delinquent.find(
        (v) => v.votePubkey === voteAccountPubkey,
      )
      if (delinquentValidator) {
        return {
          pubkey: voteAccountPubkey,
          isActive: false,
          reason: 'Validator is delinquent.',
        } as ValidatorStatusParams
      } else {
        return {
          pubkey: voteAccountPubkey,
          isActive: false,
          reason:
            'Validator is not found in both current and delinquent lists.',
        } as ValidatorStatusParams
      }
    }

    // Check the last vote timestamp.
    const lastVoteSlot = validator.lastVote
    const currentSlot = await connection.getSlot()
    const slotsSinceLastVote = currentSlot - lastVoteSlot
    if (slotsSinceLastVote > 128) {
      // This is an arbitrary number, adjust based on your needs.
      return {
        pubkey: voteAccountPubkey,
        isActive: false,
        reason: `Validator has not voted for ${slotsSinceLastVote} slots.`,
      } as ValidatorStatusParams
    }

    return {
      pubkey: voteAccountPubkey,
      isActive: true,
      reason: 'Validator is active and voting.',
    } as ValidatorStatusParams
  } catch (error) {
    throw new Error(`Error checking validator status: ${error}`)
  }
}
