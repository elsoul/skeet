'use client'

import {
  CloudFlareLogoHorizontal,
  CloudFlareLogoInvertHorizontal,
  DenoLogoHorizontal,
  DenoLogoInvertHorizontal,
  ExpoLogoHorizontal,
  ExpoLogoInvertHorizontal,
  NeonLogoHorizontal,
  NeonLogoInvertHorizontal,
  NextLogoHorizontal,
  NextLogoInvertHorizontal,
  OPOSCompressedCoil,
  OPOSSagaPhone,
  PrismaLogoHorizontal,
  PrismaLogoInvertHorizontal,
  SolanaLogoHorizontal,
  SolanaLogoInvertHorizontal,
} from '@/assets/img'
import { Button } from '@/components/ui/button'
import appInfo from '@appInfo'

import { mainShardGradation } from '@/lib/decoration'

import { cn } from '@/lib/utils'
import { Link } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useTheme } from '@/hooks/utils/useTheme'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const logos = [
  {
    title: 'CloudFlare',
    logo: CloudFlareLogoHorizontal,
    logoInvert: CloudFlareLogoInvertHorizontal,
    href: 'https://cloudflare.com/',
  },
  {
    title: 'Deno',
    logo: DenoLogoHorizontal,
    logoInvert: DenoLogoInvertHorizontal,
    href: 'https://deno.com/',
  },
  {
    title: 'Neon',
    logo: NeonLogoHorizontal,
    logoInvert: NeonLogoInvertHorizontal,
    href: 'https://neon.tech/',
  },

  {
    title: 'Prisma',
    logo: PrismaLogoHorizontal,
    logoInvert: PrismaLogoInvertHorizontal,
    href: 'https://prisma.io/',
  },
  {
    title: 'Solana',
    logo: SolanaLogoHorizontal,
    logoInvert: SolanaLogoInvertHorizontal,
    href: 'https://solana.com/',
  },
  {
    title: 'Next',
    logo: NextLogoHorizontal,
    logoInvert: NextLogoInvertHorizontal,
    href: 'https://nextjs.org/',
  },
  {
    title: 'Expo',
    logo: ExpoLogoHorizontal,
    logoInvert: ExpoLogoInvertHorizontal,
    href: 'https://expo.dev/',
  },
]

export default function HomeHeroRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <>
      <div className="relative mx-auto max-w-7xl p-3">
        <div className="absolute left-0 top-0 -z-10 opacity-20 dark:opacity-40">
          <Image
            src={OPOSCompressedCoil}
            alt="Background"
            className="h-56 w-56 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[512px] lg:w-[512px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="absolute bottom-0 right-0 -z-10 opacity-20 dark:opacity-40">
          <Image
            src={OPOSSagaPhone}
            alt="Background"
            className="h-56 w-56 sm:h-64 sm:w-64 md:h-96 md:w-96 lg:h-[512px] lg:w-[512px]"
            unoptimized
            width={256}
            height={256}
          />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 py-24 md:py-40 lg:max-w-4xl">
          <h1
            className={cn(
              'py-2 text-center text-4xl font-bold tracking-tighter sm:text-7xl lg:text-7xl',
              mainShardGradation,
            )}
          >
            {t('(home).HomeHeroRow.title1')} <br />
            {t('(home).HomeHeroRow.title2')} <br />
            {t('(home).HomeHeroRow.title3')}
          </h1>
          <p
            className={cn(
              '-mt-4 max-w-96 text-center text-xl font-medium tracking-tight sm:max-w-lg sm:text-2xl lg:-mt-2 lg:max-w-xl',
              'text-zinc-500 dark:text-zinc-300',
            )}
          >
            {t('(home).HomeHeroRow.subtitle1')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={appInfo.discordInviteURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                {
                  // @ts-ignore
                  <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                }
                {t('common.joinUs')}
              </Button>
            </Link>
            <Link
              href={`${appInfo.demoURL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">{t('common.demo')}</Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {logos.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={theme === 'light' ? item.logo : item.logoInvert}
                  alt={item.title}
                  className="w-20 lg:w-24"
                  unoptimized
                  width={256}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
