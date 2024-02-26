import {
  Connection,
  PublicKey,
  Keypair,
  StakeProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'

/**
 * Delegates SOL to a validator using an existing stake account.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} authoritySecretString - The secret key of the authority's wallet as a JSON string.
 * @param {string} stakeAccountAddress - The public key address of the stake account.
 * @param {string} validatorVoteAccount - The public key of the validator's vote account.
 * @returns {Promise<string>} - A promise that returns signature if the transaction is successful.
 * @throws {Error} - Throws an error if the transaction fails.
 *
 * @example
 * ```typescript
 * const endpoint = 'https://api.mainnet-beta.solana.com'
 * const authoritySecretString = process.env.AUTHORITY_SECRET_KEY || ''
 * const stakeAccountAddress = 'StakeAccountPublicKeyHere'
 * const validatorVoteAccount = 'ValidatorVoteAccountPublicKeyHere'
 *
 * try {
 *   const result = await delegateStake(endpoint, authoritySecretString, stakeAccountAddress, validatorVoteAccount)
 *   console.log('Stake delegation successful:', result)
 * } catch (error) {
 *   console.error('Stake delegation failed:', error)
 * }
 * ```
 */

export const delegateStake = async (
  endpoint: string,
  authoritySecretString: string,
  stakeAccountAddress: string,
  validatorVoteAccount: string,
) => {
  try {
    const stakePubkey = new PublicKey(stakeAccountAddress)
    const votePubkey = new PublicKey(validatorVoteAccount)
    const authorityAccount = new Uint8Array(JSON.parse(authoritySecretString))
    const authorityKeypair = Keypair.fromSecretKey(authorityAccount)
    const authorizedPubkey = new PublicKey(authorityAccount)
    const connection = new Connection(endpoint, 'confirmed')
    // Delegate the stake
    const delegateInstruction = StakeProgram.delegate({
      stakePubkey,
      authorizedPubkey,
      votePubkey,
    })

    const transaction = new Transaction().add(delegateInstruction)
    transaction.feePayer = authorizedPubkey
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      authorityKeypair,
    ])

    console.log('Stake delegation signature:', signature)
    return signature
  } catch (error) {
    console.error('Error delegating stake:', error)
    throw error
  }
}
