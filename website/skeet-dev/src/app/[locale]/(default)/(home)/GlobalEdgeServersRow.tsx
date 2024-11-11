import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { EdgeComputeNetworkImg } from '@/assets/img'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import appInfo from '@appInfo'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function GlobalEdgeServersRow() {
  const t = useTranslations()
  return (
    <>
      <div className="relative mx-auto max-w-7xl px-8 py-24 sm:px-12 md:py-60 lg:px-3">
        <h2
          className={cn(
            'py-2 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl',
            mainShardGradation,
          )}
        >
          {t('(home).GlobalEdgeServersRow.title')}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
          <div className="py-8 sm:col-span-3 sm:py-24">
            <div
              className={cn(
                'dark:bg-gradient-to-b',
                'dark:from-zinc-950 dark:via-white dark:to-zinc-950',
              )}
            >
              <Image
                src={EdgeComputeNetworkImg}
                alt={t('(home).GlobalEdgeServersRow.title')}
                className="w-full"
                unoptimized
                width={1920}
                height={1080}
              />
            </div>
          </div>
          <div className="hidden sm:col-span-3 sm:block" />
          <div className="hidden sm:col-span-3 sm:block" />
          <div className="sm:col-span-4">
            <h3
              className={cn(
                'pb-4 text-lg font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:pb-5 xl:text-5xl',
                mainShardGradation,
              )}
            >
              {t('(home).GlobalEdgeServersRow.summary')}
            </h3>
            <p
              className={cn(
                'text-sm font-medium sm:text-base lg:text-lg xl:text-xl',
                'text-zinc-500 dark:text-zinc-300',
              )}
            >
              {t('(home).GlobalEdgeServersRow.description')}
            </p>
            <div className="flex flex-wrap items-center justify-start gap-3 pt-6">
              <Link
                href={appInfo.discordInviteURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  {
                    // @ts-ignore
                    <FontAwesomeIcon
                      icon={faDiscord}
                      className="mr-2 h-5 w-5"
                    />
                  }
                  {t('(home).GlobalEdgeServersRow.button1')}
                </Button>
              </Link>
              <Link
                href={'https://www.cloudflare.com/network/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  {t('(home).GlobalEdgeServersRow.button2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
