'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { DEFAULT_PATHS } from '@/app/[locale]/(default)/defaultNavs'
import { useTranslations } from 'next-intl'

type Props = {
  version: number
}

export default function ShowOldDoc({ version }: Props) {
  const t = useTranslations()

  return (
    <>
      <div className="mb-12 mt-3 flex flex-wrap items-center justify-between rounded-lg bg-yellow-200/30 py-2 pl-4 pr-2 dark:bg-yellow-300/40">
        <p className="text-sm text-yellow-950 dark:text-yellow-100">
          {t('doc.youLookingOldDoc', { version })}
        </p>
        <Link href={DEFAULT_PATHS.doc}>
          <Button variant="ghost">{t('doc.toNewDoc')}</Button>
        </Link>
      </div>
    </>
  )
}
