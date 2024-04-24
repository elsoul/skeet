import fetch from 'node-fetch'
import { Umi, Transaction as UmiTransaction } from '@metaplex-foundation/umi'
import { Transaction, VersionedTransaction } from '@solana/web3.js'
import bs58 from 'bs58'

export enum PriorityLevel {
  NONE = 'None',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'VeryHigh',
  UNSAFE_MAX = 'UnsafeMax',
}

export async function getPriorityFeeEstimate(
  heliusEndpoint: string,
  transaction: Transaction | VersionedTransaction,
  priorityLevel: PriorityLevel,
) {
  const response = await fetch(heliusEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'getPriorityFeeEstimate',
      method: 'getPriorityFeeEstimate',
      params: [
        {
          transaction: bs58.encode(transaction.serialize()),
          options: { priorityLevel },
        },
      ],
    }),
  })
  const data = (await response.json()) as {
    result: { priorityFeeEstimate: number }
  }

  return data.result
}

export async function getPriorityFeeEstimateForUmi(
  heliusEndpoint: string,
  umi: Umi,
  transaction: UmiTransaction,
  priorityLevel: PriorityLevel,
) {
  const response = await fetch(heliusEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'getPriorityFeeEstimateForUmi',
      method: 'getPriorityFeeEstimate',
      params: [
        {
          transaction: bs58.encode(umi.transactions.serialize(transaction)),
          options: { priorityLevel },
        },
      ],
    }),
  })
  const data = (await response.json()) as {
    result: { priorityFeeEstimate: number }
  }

  return data.result
}
