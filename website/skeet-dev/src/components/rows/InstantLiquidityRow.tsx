'use client'

import {
  elSOLAngledRight,
  OrcaLogoHorizontal,
  OrcaLogoInvertHorizontal
} from '@/assets/img'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import { useTheme } from '@/hooks/utils/useTheme'
import { ELSOL_LP_ORCA_LINK } from '@/constants/links'
import LiquidityTabs from '@/components/solana/LiquidityTabs'

const logos = [
  {
    title: 'Orca',
    logo: OrcaLogoHorizontal,
    logoInvert: OrcaLogoInvertHorizontal,
    href: ELSOL_LP_ORCA_LINK
  }
]

export default function InstantLiquidityRow() {
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
              {t('common.InstantLiquidityRow.title1')} <br />
              {t('common.InstantLiquidityRow.title2')}
            </h2>
            <p
              className={cn(
                'max-w-96 text-sm font-medium sm:max-w-lg sm:text-lg lg:max-w-xl lg:text-xl',
                'text-zinc-500 dark:text-zinc-300'
              )}
            >
              {t('common.InstantLiquidityRow.body')}
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
            <LiquidityTabs />
          </div>
        </div>
      </div>
    </>
  )
}
