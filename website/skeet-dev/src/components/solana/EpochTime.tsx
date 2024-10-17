'use client'

import { useEffect, useState } from 'react'
import { Connection, EpochInfo } from '@solana/web3.js'
import { solanaEndpoint } from '@/components/providers/SolanaWalletProvider'
import { intervalToDuration } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'

const connection = new Connection(solanaEndpoint)

export default function EpochTime() {
  const t = useTranslations()
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null)
  const [averageSlotTime, setAverageSlotTime] = useState<number>(0)
  const [remainingTime, setRemainingTime] = useState<number>(0)
  const [progressPercentage, setProgressPercentage] = useState<number>(0)
  const [initialTimestamp, setInitialTimestamp] = useState<number>(0)
  const [initialRemainingTime, setInitialRemainingTime] = useState<number>(0)

  useEffect(() => {
    const fetchEpochData = async () => {
      try {
        const [epochInfoResult, performanceSamples] = await Promise.all([
          connection.getEpochInfo(),
          connection.getRecentPerformanceSamples(5),
        ])
        setEpochInfo(epochInfoResult)

        if (performanceSamples.length === 0) {
          throw new Error('Could not get performance samples')
        }

        const slotTimes = performanceSamples.map(
          (sample) => sample.samplePeriodSecs / sample.numSlots,
        )
        const avgSlotTime =
          slotTimes.reduce((a, b) => a + b, 0) / slotTimes.length
        setAverageSlotTime(avgSlotTime)

        const slotsElapsed = epochInfoResult.slotIndex
        const totalSlots = epochInfoResult.slotsInEpoch
        const slotsRemaining = totalSlots - slotsElapsed

        const remainingSeconds = slotsRemaining * avgSlotTime
        setRemainingTime(remainingSeconds)
        setInitialRemainingTime(remainingSeconds)
        setInitialTimestamp(Date.now())

        const progress = (slotsElapsed / totalSlots) * 100
        setProgressPercentage(progress)
      } catch (error) {
        console.error('Error fetching epoch data:', error)
      }
    }

    fetchEpochData()
  }, [])

  useEffect(() => {
    if (initialTimestamp === 0 || initialRemainingTime === 0) return

    const interval = setInterval(() => {
      const timeElapsed = (Date.now() - initialTimestamp) / 1000
      const newRemainingTime = initialRemainingTime - timeElapsed

      setRemainingTime(newRemainingTime >= 0 ? newRemainingTime : 0)

      if (epochInfo && averageSlotTime > 0) {
        const totalSlots = epochInfo.slotsInEpoch
        const slotsElapsed = epochInfo.slotIndex + timeElapsed / averageSlotTime
        const progress = (slotsElapsed / totalSlots) * 100
        setProgressPercentage(progress <= 100 ? progress : 100)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [initialTimestamp, initialRemainingTime, epochInfo, averageSlotTime])

  const formatRemainingTime = (seconds: number) => {
    const duration = intervalToDuration({
      start: 0,
      end: seconds * 1000,
    })
    const totalHours = (duration.days || 0) * 24 + (duration.hours || 0)
    const hours = totalHours.toString().padStart(2, '0')
    const minutes = (duration.minutes || 0).toString().padStart(2, '0')
    const secs = (duration.seconds || 0).toString().padStart(2, '0')
    return `${hours}:${minutes}:${secs}`
  }

  return (
    <div className="grid">
      {epochInfo ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <p className="text-sm font-light text-zinc-500 dark:text-zinc-300">
                {t('common.EpochTime.currentEpoch')}
              </p>
              <p
                className={cn(
                  'text-4xl font-bold tracking-tighter sm:text-5xl',
                  mainShardGradation,
                )}
              >
                {epochInfo.epoch}
              </p>
            </div>
            <div className="grid gap-1">
              <Progress value={progressPercentage} />
              <p className="text-right text-xs tracking-tight text-zinc-400">
                {progressPercentage.toFixed(0)}% Complete
              </p>
              <div className="grid gap-1">
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-300">
                  {t('common.EpochTime.remainingTime')}
                </p>
                <p className="font-mono text-xl text-zinc-700 dark:text-zinc-200 sm:text-2xl">
                  {formatRemainingTime(remainingTime)}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid">
          <Skeleton className="h-48 w-full" />
        </div>
      )}
    </div>
  )
}
