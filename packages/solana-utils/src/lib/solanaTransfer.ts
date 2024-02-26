import * as solanaWeb3 from '@solana/web3.js'
import { Keypair, Connection } from '@solana/web3.js'
/**
 * Transfers SOL from one wallet to another on the Solana blockchain.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {number[]} fromWalletKey - The secret key of the sender's wallet as an array of numbers.
 * @param {string} toAddressPubkey - The public key of the recipient's wallet.
 * @param {number} transferAmountLamport - The amount of lamports to transfer.
 * @returns {Promise<boolean>} - A promise that resolves to true upon successful transaction.
 * @throws {Error} - Throws an error if the transaction fails.
 *
 * @example
 * ```
 * const run = async () => {
 *   const endpoint = 'https://api.mainnet-beta.solana.com';
 *   const fromWalletSecretKey = [/* Your Secret Key Array Elements *\/];
 *   const toWalletAddress = 'RecipientPublicKeyHere';
 *   const transferAmount = 1000000; // Amount in lamports
 *
 *   try {
 *     const result = await solanaTransfer(endpoint, fromWalletSecretKey, toWalletAddress, transferAmount);
 *     console.log('Transaction successful:', result);
 *   } catch (error) {
 *     console.error('Transaction failed:', error);
 *   }
 * }
 *
 * run();
 * ```
 */
export const solanaTransfer = async (
  endpoint: string,
  fromWalletKey: number[],
  toAddressPubkey: string,
  transferAmountLamport: number,
) => {
  try {
    const connection = new Connection(endpoint, 'confirmed')

    const fromWallet = Keypair.fromSecretKey(
      new Uint8Array(Array.from(fromWalletKey)),
    )
    const toPubkey = new solanaWeb3.PublicKey(toAddressPubkey)
    const lamports = transferAmountLamport
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey,
        lamports,
      }),
    )
    transaction.feePayer = fromWallet.publicKey
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash
    const signature = await solanaWeb3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet],
    )
    const latestBlockHash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature,
    })
    console.log('SOL Transaction signature:', signature)

    return true
  } catch (error) {
    console.log(`solanaTransfer: ${error}`)
    throw new Error(JSON.stringify(error))
  }
}
