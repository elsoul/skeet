import { Link } from '@/navigation'
import appInfo from '@appInfo'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CTARow() {
  const t = useTranslations()
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-64 lg:flex lg:items-center lg:justify-between">
        <div>
          <h2
            className={cn(
              'py-2 text-5xl font-extrabold tracking-tighter sm:text-5xl',
              mainShardGradation,
            )}
          >
            {t('common.CTARow.title')}
          </h2>
          <p className="max-w-xl text-lg font-medium tracking-tight text-zinc-500 dark:text-zinc-400 sm:text-xl">
            {t('common.CTARow.body')}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Link href={appInfo.discordInviteURL}>
            <Button>
              {
                // @ts-ignore
                <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
              }
              {t('common.CTARow.button')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
