'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  fetchAndParsePricesCsv,
  calcYield,
  getPriceRangeFromPeriod,
  PERIOD,
} from '@glitchful-dev/sol-apy-sdk'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ElsolAPY() {
  const t = useTranslations()
  const [apy, setAPY] = useState<number | null>(null)

  useEffect(() => {
    const fetchAPY = async () => {
      try {
        const prices = await fetchAndParsePricesCsv(
          'https://raw.githubusercontent.com/glitchful-dev/sol-stake-pool-apy/master/db/elSOL.csv',
        )

        const priceRange = getPriceRangeFromPeriod(prices, PERIOD.DAYS_30)

        if (!priceRange) {
          console.error('Cloud not fetch price range')
          return
        }

        const result = calcYield(priceRange)

        if (result?.apy !== undefined) {
          setAPY(result.apy * 100)
        }
      } catch (error) {
        console.error('Error fetching APY:', error)
      }
    }

    fetchAPY()
  }, [])

  return (
    <div className="grid">
      {apy !== null ? (
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <p className="text-sm font-light text-zinc-500 dark:text-zinc-300">
              {t('common.ElsolAPY.currentAPY')}
            </p>
            <p
              className={cn(
                'flex flex-wrap items-end text-4xl font-bold tracking-tighter sm:text-5xl',
                mainShardGradation,
              )}
            >
              {apy.toFixed(2)}
              <span className="ml-1 text-2xl tracking-tight">%</span>
            </p>
          </div>
          <p className="text-xs font-light text-zinc-400 dark:text-zinc-400">
            {t('common.ElsolAPY.30daysCalculate')}
          </p>
          <Link
            href="https://github.com/glitchful-dev/sol-stake-pool-apy"
            className="hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="flex flex-row items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-300">
              <FontAwesomeIcon
                icon={faGithub}
                className="h-4 w-4 text-zinc-500 dark:text-zinc-300"
              />
              Data from sol-stake-pool-apy
            </p>
          </Link>
        </div>
      ) : (
        <div className="grid">
          <Skeleton className="h-48 w-full" />
        </div>
      )}
    </div>
  )
}
