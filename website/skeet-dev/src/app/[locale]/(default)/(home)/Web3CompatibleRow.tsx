import { Web3CompatibleImg } from '@/assets/img'
import { Button } from '@/components/ui/button'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import appInfo from '@appInfo'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DEFAULT_PATHS } from '../defaultNavs'

export default function Web3CompatibleRow() {
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
          {t('(home).Web3CompatibleRow.title')}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
          <div className="px-16 sm:col-span-3 sm:px-0">
            <Image
              src={Web3CompatibleImg}
              alt={t('(home).Web3CompatibleRow.title')}
              className="w-full"
              unoptimized
              width={256}
              height={256}
            />
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
              {t('(home).Web3CompatibleRow.summary')}
            </h3>
            <p
              className={cn(
                'text-sm font-medium sm:text-base lg:text-lg xl:text-xl',
                'text-zinc-500 dark:text-zinc-300',
              )}
            >
              {t('(home).Web3CompatibleRow.description')}
            </p>
            <div className="flex flex-wrap items-center justify-start gap-3 pt-6">
              <Link
                href={'https://solana-dapp.skeeter.dev/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{t('(home).Web3CompatibleRow.button1')}</Button>
              </Link>
              <Link
                href="https://github.com/elsoul/skeet-v3-solana-dapp-rc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  {
                    // @ts-ignore
                    <FontAwesomeIcon icon={faGithub} className="mr-2 h-5 w-5" />
                  }
                  {t('(home).Web3CompatibleRow.button2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
