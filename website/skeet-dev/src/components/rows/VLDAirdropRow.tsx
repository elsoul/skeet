'use client'

import { Link } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import {
  ValidatorsDAOLogoHorizontal,
  ValidatorsDAOLogoInvertHorizontal,
  VLDAirdropImg
} from '@/assets/img'
import {
  VALIDATORS_DAO_DISCORD_INVITE_LINK,
  VALIDATORS_DAO_LINK
} from '@/constants/links'
import { useTheme } from '@/hooks/utils/useTheme'

const logos = [
  {
    title: 'ValidatorsDAO',
    logo: ValidatorsDAOLogoHorizontal,
    logoInvert: ValidatorsDAOLogoInvertHorizontal,
    href: VALIDATORS_DAO_LINK
  }
]

export default function VLDAirdropRow() {
  const t = useTranslations()
  const locale = useLocale()
  const { theme, mounted } = useTheme()
  if (!mounted) return null

  return (
    <>
      <div className="mx-auto grid max-w-7xl items-center justify-center px-6 py-48 sm:py-80 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className="grid w-full gap-2">
          <div className="flex flex-wrap items-center justify-start gap-4">
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
                  alt="Background"
                  className="w-20 sm:w-24 md:w-28"
                  unoptimized
                  width={256}
                />
              </Link>
            ))}
          </div>
          <h2
            className={cn(
              'py-2 text-5xl font-extrabold tracking-tighter sm:text-5xl',
              mainShardGradation
            )}
          >
            {t('common.VLDAirdropRow.title')}
          </h2>

          <p className="max-w-xl text-lg font-medium tracking-tight text-zinc-500 dark:text-zinc-400 sm:text-xl">
            {t('common.VLDAirdropRow.body')}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={VALIDATORS_DAO_DISCORD_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                {t('common.VLDAirdropRow.button1')}
              </Button>
            </Link>
            <Link
              href={`https://elsol.app/${locale}/staking`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                {t('common.VLDAirdropRow.button2')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full">
          <Image
            src={VLDAirdropImg}
            alt="VLD Airdrop"
            className="w-full"
            unoptimized
            width={256}
            height={256}
          />
        </div>
      </div>
    </>
  )
}
