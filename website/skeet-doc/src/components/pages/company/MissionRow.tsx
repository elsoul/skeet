import { useTranslation } from 'next-i18next'

export default function MissionRow() {
  const { t } = useTranslation()

  return (
    <>
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto flex max-w-xl flex-col items-center lg:text-center">
            <h2 className="bg-gradient-to-tl from-red-400 via-purple-400 to-blue-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
              {t('company:MissionRow.tagline')}
            </h2>
            <p className="mt-3 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              {t('company:MissionRow.title')}
            </p>
            <p className="mt-8 text-left text-lg leading-8 text-gray-600 dark:text-gray-300 sm:mt-12">
              {t('company:MissionRow.description1')}
            </p>
            <p className="mt-4 text-left text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('company:MissionRow.description2')}
            </p>
            <p className="mt-4 text-left text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('company:MissionRow.description3')}
            </p>
            <p className="mt-4 text-left text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('company:MissionRow.description4')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
