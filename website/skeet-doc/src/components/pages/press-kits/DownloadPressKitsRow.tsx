import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import logoHorizontal from '@/assets/img/logo/ELSOULLaboLogoHorizontal.svg'
import logoHorizontalInvert from '@/assets/img/logo/ELSOULLaboLogoHorizontalInvert.svg'
import { useMemo } from 'react'
import siteConfig from '@/config/site'

const merits = [
  {
    title: 'press-kits:DownloadPressKitsRow.meritTitle1',
    description: 'press-kits:DownloadPressKitsRow.meritDescription1',
    icon: DocumentTextIcon,
  },
]

export default function DownloadPressKitsRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="bg-gradient-to-tl from-red-400 via-purple-400 to-blue-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
              Press Kits
            </h2>
            <p className="mt-3 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
              {t('press-kits:DownloadPressKitsRow.title')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('press-kits:DownloadPressKitsRow.description')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-5 lg:gap-y-16">
              <dl className="col-span-1 grid grid-cols-1 gap-y-10 lg:col-span-3">
                {merits.map((item) => (
                  <div key={item.title} className="relative pl-16">
                    <dt className="text-lg font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-sm bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:text-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-1">{t(item.title)}</p>
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {t(item.description)}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="col-span-1 h-full w-full rounded-sm bg-gray-50 p-8 shadow-md ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-600 lg:col-span-2">
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="w-24">
                    <Image
                      src={logoHorizontal}
                      alt="ELSOUL"
                      className="dark:hidden"
                      unoptimized
                    />
                    <Image
                      src={logoHorizontalInvert}
                      alt="ELSOUL"
                      className="hidden dark:block"
                      unoptimized
                    />
                  </div>
                  <p className="mt-6 text-center font-bold tracking-tight">
                    {t('press-kits:DownloadPressKitsRow.cardTitle')}
                  </p>
                  <p className="mt-2 text-center text-sm font-light tracking-tight">
                    by ELSOUL LABO
                  </p>
                  <a
                    href={
                      isJapanese
                        ? siteConfig.downloadPressKitsJA
                        : siteConfig.downloadPressKitsEN
                    }
                    className="mt-8 rounded-sm bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t('press-kits:DownloadPressKitsRow.cardButton')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
