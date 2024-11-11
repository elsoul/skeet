'use client'

import { Link } from '@/i18n/routing'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { useTranslations } from 'next-intl'

type PagerData = {
  nextRoute: {
    path: string
    title: string
  } | null
  previousRoute: {
    path: string
    title: string
  } | null
}

type Props = {
  pagerData: PagerData
}

export default function ArticlePager({ pagerData }: Props) {
  const t = useTranslations()
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          {pagerData.previousRoute && (
            <Link
              href={pagerData.previousRoute.path}
              className="block h-full w-full rounded-lg border border-zinc-300 p-3 hover:opacity-80"
            >
              <p className="flex flex-row items-center justify-start">
                <ArrowLeftIcon className="mr-1.5 h-5 w-5" />
                {t('common.toPrevious')}
              </p>
              <p className="mt-2 text-left text-xs font-light text-zinc-500 dark:text-zinc-400">
                {pagerData.previousRoute.title}
              </p>
            </Link>
          )}
        </div>
        <div className="flex-1">
          {pagerData.nextRoute && (
            <Link
              href={pagerData.nextRoute.path}
              className="block h-full w-full rounded-lg border border-zinc-300 p-3 hover:opacity-80"
            >
              <p className="flex flex-row items-center justify-end">
                {t('common.toNext')}
                <ArrowRightIcon className="ml-1.5 h-5 w-5" />
              </p>
              <p className="mt-2 text-right text-xs font-light text-zinc-500 dark:text-zinc-400">
                {pagerData.nextRoute.title}
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
