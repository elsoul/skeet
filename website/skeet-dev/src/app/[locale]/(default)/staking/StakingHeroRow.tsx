'use client'

import {
  elSOLAngledRight,
  SolanaFoundationLogoHorizontal,
  SolanaFoundationLogoInvertHorizontal
} from '@/assets/img'
import { Button } from '@/components/ui/button'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { DEFAULT_PATHS } from '../defaultNavs'
import { useTheme } from '@/hooks/utils/useTheme'
import { SOLANA_FOUNDATION_STAKE_POOL_LINK } from '@/constants/links'
import StakingTabs from './StakingTabs'

const logos = [
  {
    title: 'SolanaFoundation',
    logo: SolanaFoundationLogoHorizontal,
    logoInvert: SolanaFoundationLogoInvertHorizontal,
    href: SOLANA_FOUNDATION_STAKE_POOL_LINK
  }
]

export default function StakingHeroRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <>
      <div className="relative mx-auto max-w-7xl p-3">
        <div className="absolute left-0 top-0 -z-10 opacity-10 dark:opacity-20">
          <Image
            src={elSOLAngledRight}
            alt="Background"
            className="h-48 w-48 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[440px] lg:w-[440px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="relative mx-auto grid items-center gap-24 py-24 md:grid-cols-2 md:py-48">
          <div className="grid w-full gap-4 p-4">
            <h2
              className={cn(
                'py-2 text-5xl font-bold tracking-tighter sm:text-7xl lg:text-8xl',
                mainShardGradation
              )}
            >
              {t('staking.StakingHeroRow.title1')} <br />
              {t('staking.StakingHeroRow.title2')}
            </h2>
            <p
              className={cn(
                'max-w-96 text-sm font-medium sm:max-w-lg sm:text-lg lg:-mt-2 lg:max-w-xl lg:text-xl',
                'text-zinc-500 dark:text-zinc-300'
              )}
            >
              {t('staking.StakingHeroRow.subtitle1')} <br />
              {t('staking.StakingHeroRow.subtitle2')}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-start gap-4">
              {logos.map((logo) => (
                <Link
                  key={logo.title}
                  href={logo.href}
                  className="hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={theme === 'light' ? logo.logo : logo.logoInvert}
                    alt="Background"
                    className="w-20 sm:w-24 md:w-28"
                    unoptimized
                    width={256}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl p-4">
            <StakingTabs />
          </div>
        </div>
      </div>
    </>
  )
}
