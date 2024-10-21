import { Link } from '@/navigation'

import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { EpicsDAOImg } from '@/assets/img'
import {
  EPICS_DAO_DISCORD_INVITE_LINK,
  EPICS_DAO_WEB_LINK,
} from '@/constants/links'

export default function DAOsEpicsRow() {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <>
      <div className="mx-auto grid max-w-7xl items-center justify-center gap-4 px-6 py-48 sm:gap-8 sm:py-80 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className="w-full md:order-last">
          <Link
            href={`${EPICS_DAO_WEB_LINK}${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src={EpicsDAOImg}
              alt="Epics DAO"
              className="w-full rounded-lg shadow-lg"
              unoptimized
              width={256}
              height={256}
            />
          </Link>
        </div>
        <div className="grid w-full gap-4 md:order-first">
          <h2
            className={cn(
              'py-2 text-3xl font-extrabold tracking-tighter sm:text-4xl',
              mainShardGradation,
            )}
          >
            {t('common.DAOsEpicsRow.title')}
          </h2>
          <p className="max-w-xl text-lg font-medium tracking-tight text-zinc-500 dark:text-zinc-300 sm:text-xl">
            {t('common.DAOsEpicsRow.body')}
          </p>
          <div className="flex flex-wrap gap-3 pt-6">
            <Link
              href={`${EPICS_DAO_WEB_LINK}${locale}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>{t('common.DAOsEpicsRow.button1')}</Button>
            </Link>
            <Link
              href={`${EPICS_DAO_DISCORD_INVITE_LINK}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <FontAwesomeIcon icon={faDiscord} className="mr-2 h-5 w-5" />
                {t('common.DAOsEpicsRow.button2')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
