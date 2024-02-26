import {
  Authorized,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
/**
 * Creates a stake account on the Solana blockchain.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} authoritySecretString - The secret string of the authority's keypair.
 * @param {string} stakeAccountAddress - The public key of the stake account.
 * @param {number} amount - The amount in SOL to be staked.
 * @returns {Promise<string>} - A promise that resolves with the transaction signature.
 * @throws {Error} - Throws an error if the transaction fails.
 *
 * @example
 * ```
 * const endpoint = 'https://api.mainnet-beta.solana.com';
 * const authoritySecretString = '[1,2,3,...]'; // Replace with actual secret key array
 * const stakeAccountAddress = 'YourStakeAccountPublicKeyHere';
 * const amount = 1; // Amount in SOL to be staked
 *
 * createStakeAccount(endpoint, authoritySecretString, stakeAccountAddress, amount)
 *   .then(signature => console.log('Transaction Signature:', signature))
 *   .catch(error => console.error('Error:', error));
 * ```
 */
export const createStakeAccount = async (
  endpoint: string,
  authoritySecretString: string,
  stakeAccountAddress: string,
  amount: number,
) => {
  try {
    const connection = new Connection(endpoint, 'confirmed')
    const stakePubkey = new PublicKey(stakeAccountAddress)

    // Check if the stake account already exists
    const accountInfo = await connection.getAccountInfo(stakePubkey)
    if (accountInfo !== null) {
      throw new Error('Stake account already exists')
    }

    // Continue with stake account creation if the account does not exist
    const authorityAccount = new Uint8Array(JSON.parse(authoritySecretString))
    const authorityKeypair = Keypair.fromSecretKey(authorityAccount)
    const lamports = amount * LAMPORTS_PER_SOL // Convert SOL to lamports

    // Create a new stake account
    const createStakeAccountInstruction = StakeProgram.createAccount({
      fromPubkey: authorityKeypair.publicKey,
      stakePubkey,
      authorized: new Authorized(
        authorityKeypair.publicKey,
        authorityKeypair.publicKey,
      ),
      lamports,
    })

    const transaction = new Transaction().add(createStakeAccountInstruction)
    transaction.feePayer = authorityKeypair.publicKey
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      authorityKeypair,
    ])
    console.log('Created Account signature:', signature)
    return signature
  } catch (error) {
    console.error('Error creating stake account:', error)
    throw error
  }
}
