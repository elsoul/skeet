'use client'

import { useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { getStakePoolAccount } from '@solana/spl-stake-pool'
import { Skeleton } from '@/components/ui/skeleton'
import { solanaEndpoint } from '@/components/providers/SolanaWalletProvider'
import { SOLV_STAKE_POOL_ADDRESS } from '@/constants/address'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import { useTranslations } from 'next-intl'

const connection = new Connection(solanaEndpoint)

export default function ElsolPrice() {
  const t = useTranslations()
  const [solPrice, setSolPrice] = useState<number | null>(null)
  const [elsolStakePoolPrice, setElsolStakePoolPrice] = useState<number | null>(
    null,
  )
  const [elsolPriceInUSD, setElsolPriceInUSD] = useState<number | null>(null)

  useEffect(() => {
    const fetchStakePoolPrice = async () => {
      try {
        const stakePoolPublicKey = new PublicKey(SOLV_STAKE_POOL_ADDRESS)

        const stakePoolAccount = await getStakePoolAccount(
          connection,
          stakePoolPublicKey,
        )

        if (
          !stakePoolAccount ||
          !stakePoolAccount.account ||
          !stakePoolAccount.account.data
        ) {
          throw new Error('Could not fetch stake pool account data')
        }

        const stakePoolData = stakePoolAccount.account.data

        const totalLamportsStaked = stakePoolData.totalLamports.toNumber()
        const poolTokenSupply = stakePoolData.poolTokenSupply.toNumber()

        if (poolTokenSupply === 0 || totalLamportsStaked === 0) {
          console.error('Invalid data: pool token supply or lamports is zero')
          return
        }

        const stakePoolTokenPrice = totalLamportsStaked / poolTokenSupply
        setElsolStakePoolPrice(stakePoolTokenPrice)
      } catch (error) {
        console.error('Error fetching elSOL stake pool price:', error)
      }
    }

    fetchStakePoolPrice()
  }, [])

  useEffect(() => {
    const fetchSOLPrice = async () => {
      try {
        const ownEndpoint = process.env.NEXT_PUBLIC_SOLANA_PRICE_ENDPOINT
        const response = await fetch(
          ownEndpoint
            ? ownEndpoint
            : 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
        )

        let price = 0

        if (ownEndpoint) {
          const data = await response.text()
          price = Number(data)
        } else {
          const data = await response.json()
          price = data.solana.usd
        }

        setSolPrice(price)
      } catch (error) {
        console.error('Error fetching SOL price:', error)
      }
    }

    if (elsolStakePoolPrice !== null) {
      fetchSOLPrice()
    }
  }, [elsolStakePoolPrice])

  useEffect(() => {
    if (solPrice !== null && elsolStakePoolPrice !== null) {
      const calculatedPrice = solPrice * elsolStakePoolPrice
      setElsolPriceInUSD(calculatedPrice)
    }
  }, [solPrice, elsolStakePoolPrice])

  return (
    <div className="grid">
      {elsolStakePoolPrice !== null ? (
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <p className="text-sm font-light text-zinc-500 dark:text-zinc-300">
              1 elSOL ≒
            </p>
            <p
              className={cn(
                'flex flex-wrap items-end text-4xl font-bold tracking-tighter sm:text-5xl',
                mainShardGradation,
              )}
            >
              {elsolStakePoolPrice?.toLocaleString()}
              <span className="ml-1 text-2xl tracking-tight">SOL</span>
            </p>
            {elsolPriceInUSD !== null ? (
              <p className="font-mono tracking-tight text-zinc-500 dark:text-zinc-300 sm:text-lg">
                ($
                {elsolPriceInUSD.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
                )
              </p>
            ) : (
              <Skeleton className="h-5 w-24" />
            )}
            <p className="text-xs font-light text-zinc-500 dark:text-zinc-300">
              1 SOL ≒{' '}
              {elsolStakePoolPrice &&
                (1 / elsolStakePoolPrice).toLocaleString()}{' '}
              elSOL
            </p>
            <p className="text-xs font-light text-zinc-400 dark:text-zinc-400">
              {t('common.priceDataFromCoingecko')}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid">
          <Skeleton className="h-48 w-full" />
        </div>
      )}
    </div>
  )
}
