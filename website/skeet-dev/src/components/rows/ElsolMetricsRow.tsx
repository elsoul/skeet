'use client'

import EpochTime from '@/components/solana/EpochTime'
import ElsolAPY from '@/components/solana/ElsolAPY'
import ElsolPrice from '@/components/solana/ElsolPrice'
import TotalStakedSol from '@/components/solana/TotalStakedSol'

export default function ElsolMetricsRow() {
  return (
    <>
      <div className="mx-auto my-6 grid max-w-7xl grid-cols-2 gap-6 p-4 sm:my-12 sm:gap-8 sm:p-8 md:grid-cols-4">
        <EpochTime />
        <ElsolAPY />
        <ElsolPrice />
        <TotalStakedSol />
      </div>
    </>
  )
}
