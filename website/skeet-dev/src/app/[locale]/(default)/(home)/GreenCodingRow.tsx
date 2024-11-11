import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { GreenCodingImg } from '@/assets/img'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import appInfo from '@appInfo'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function GreenCodingRow() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <>
      <div className="relative mx-auto max-w-7xl px-8 py-24 sm:px-12 md:py-60 lg:px-3">
        <h2
          className={cn(
            'mx-auto max-w-4xl py-2 text-center text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl',
            mainShardGradation,
          )}
        >
          {t('(home).GreenCodingRow.title')}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
          <div className="hidden sm:col-span-4 sm:block" />
          <div className="px-16 sm:col-span-3 sm:px-0">
            <Image
              src={GreenCodingImg}
              alt={t('(home).GreenCodingRow.title')}
              className="w-full"
              unoptimized
              width={256}
              height={256}
            />
          </div>
          <div className="sm:col-span-4">
            <h3
              className={cn(
                'pb-4 text-lg font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:pb-5 xl:text-5xl',
                mainShardGradation,
              )}
            >
              {t('(home).GreenCodingRow.summary')}
            </h3>
            <p
              className={cn(
                'text-sm font-medium sm:text-base lg:text-lg xl:text-xl',
                'text-zinc-500 dark:text-zinc-300',
              )}
            >
              {t('(home).GreenCodingRow.description')}
            </p>
            <div className="flex flex-wrap items-center justify-start gap-3 pt-6">
              <Link
                href={appInfo.discordInviteURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                  {t('(home).GreenCodingRow.button')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
