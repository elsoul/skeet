import Link from '@/components/routing/Link'
import { useTranslation } from 'next-i18next'

export default function CTASectionRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-7xl">
              Just Build It.
            </h2>
            <p className="text-xl font-bold tracking-tight text-gray-400 dark:text-gray-400 sm:text-2xl">
              {t('common:CTASectionRow.subtitle')}
            </p>
          </div>

          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link
              href="/doc/skeet-firestore/quickstart/"
              className="bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              {t('common:CTASectionRow.button')}
            </Link>
            <a
              href="https://skeeter.dev/"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common:CTASectionRow.demo')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
