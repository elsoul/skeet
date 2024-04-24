import {
  Connection,
  Keypair,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import { PriorityLevel } from './priorityFee'
import { getTestVersionedTxResult } from './getTestVersionedTxResult'

export const confirmTransaction = async (
  connection: Connection,
  fromWalletKeyString: string,
  instructions: TransactionInstruction[],
  priorityFee: PriorityLevel = PriorityLevel.LOW,
) => {
  try {
    const fromWalletKey = fromWalletKeyString.split(',').map(Number)
    const fromWallet = Keypair.fromSecretKey(
      new Uint8Array(Array.from(fromWalletKey)),
    )
    let tryCount = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        tryCount++
        const testVersionedTx = await getTestVersionedTxResult(
          connection,
          fromWalletKeyString,
          instructions,
          priorityFee,
        )
        const versionedTx = new VersionedTransaction(
          new TransactionMessage({
            instructions: testVersionedTx.instructionsForFinalTx,
            payerKey: fromWallet.publicKey,
            recentBlockhash:
              testVersionedTx.latestBlockhashAndContext.value.blockhash,
          }).compileToV0Message(),
        )

        versionedTx.sign([fromWallet])
        const signature = await connection.sendRawTransaction(
          versionedTx.serialize(),
        )
        await connection.confirmTransaction(
          {
            ...testVersionedTx.latestBlockhashAndContext.value,
            signature,
          },
          'finalized',
        )
        console.log('finalized signature:', signature)
        return signature
      } catch (error) {
        console.log(
          `confirmTransaction failed: ${error}\nRetrying ${tryCount} times..`,
        )
      }
    }
  } catch (error) {
    console.log(`confirmTransaction: ${error}`)
    throw new Error(JSON.stringify(error))
  }
}
