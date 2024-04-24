import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import { PriorityLevel, getPriorityFeeEstimate } from './priorityFee'

export const getTestVersionedTxResult = async (
  connection: Connection,
  fromWalletKeyString: string,
  instructions: TransactionInstruction[],
  priorityFee: PriorityLevel = PriorityLevel.LOW,
) => {
  const fromWalletKey = fromWalletKeyString.split(',').map(Number)
  const fromWallet = Keypair.fromSecretKey(
    new Uint8Array(Array.from(fromWalletKey)),
  )
  const testInstructions = [
    ...instructions,
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 200_000,
    }),
    ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: Math.ceil(5000000),
    }),
  ]
  const latestBlockhashAndContext =
    await connection.getLatestBlockhashAndContext({
      commitment: 'finalized',
    })
  const testVersionedTx = new VersionedTransaction(
    new TransactionMessage({
      instructions: testInstructions,
      payerKey: fromWallet.publicKey,
      recentBlockhash: latestBlockhashAndContext.value.blockhash,
    }).compileToV0Message(),
  )
  const simulationResult = await connection.simulateTransaction(
    testVersionedTx,
    {
      replaceRecentBlockhash: true,
      sigVerify: false,
    },
  )
  testVersionedTx.sign([fromWallet])
  const estimatedFee = await getPriorityFeeEstimate(
    connection.rpcEndpoint,
    testVersionedTx,
    priorityFee,
  )
  console.log('estimatedFee:', estimatedFee)

  const instructionsForFinalTx: TransactionInstruction[] = [
    ...instructions,
    ComputeBudgetProgram.setComputeUnitLimit({
      units: simulationResult.value.unitsConsumed
        ? Math.trunc(simulationResult.value.unitsConsumed * 1.2)
        : 200_000,
    }),
    ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: Math.ceil(estimatedFee.priorityFeeEstimate),
    }),
  ]
  const result = {
    testVersionedTx,
    instructionsForFinalTx,
    estimatedFee: estimatedFee.priorityFeeEstimate,
    simulationResult,
    latestBlockhashAndContext,
  }
  return result
}
