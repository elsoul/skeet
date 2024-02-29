import {
  ChatBubbleLeftEllipsisIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import logoHorizontal from '@/assets/img/logo/SkeetLogoHorizontal.svg'
import logoHorizontalInvert from '@/assets/img/logo/SkeetLogoHorizontalInvert.svg'
import { useMemo } from 'react'
import siteConfig from '@/config/site'

const merits = [
  {
    title: 'enterprise:EnterpriseSupportFormRow.meritTitle1',
    description: 'enterprise:EnterpriseSupportFormRow.meritDescription1',
    icon: ChatBubbleLeftEllipsisIcon,
  },
  {
    title: 'enterprise:EnterpriseSupportFormRow.meritTitle2',
    description: 'enterprise:EnterpriseSupportFormRow.meritDescription2',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'enterprise:EnterpriseSupportFormRow.meritTitle3',
    description: 'enterprise:EnterpriseSupportFormRow.meritDescription3',
    icon: RocketLaunchIcon,
  },
]

export default function EnterpriseSupportFormRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <span className="inline-flex items-center gap-x-1.5 px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200 dark:text-white">
              <svg
                className="h-1.5 w-1.5 fill-green-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Support
            </span>
            <p className="mx-auto mt-3 max-w-xl text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
              {t('enterprise:EnterpriseSupportFormRow.title')}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('enterprise:EnterpriseSupportFormRow.description')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-5 lg:gap-y-16">
              <dl className="col-span-1 grid grid-cols-1 gap-y-10 lg:col-span-3">
                {merits.map((item) => (
                  <div key={item.title} className="relative  pl-16">
                    <dt className="text-lg font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800">
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
              <div className="col-span-1 h-full w-full bg-gray-50 p-8 shadow-md ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-600 lg:col-span-2">
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="w-24">
                    <Image
                      src={logoHorizontal}
                      alt="Skeet Framework"
                      className="dark:hidden"
                      unoptimized
                    />
                    <Image
                      src={logoHorizontalInvert}
                      alt="Skeet Framework"
                      className="hidden dark:block"
                      unoptimized
                    />
                  </div>
                  <p className="mt-6 text-center font-bold tracking-tight">
                    {t('enterprise:EnterpriseSupportFormRow.cardTitle')}
                  </p>
                  <p className="mt-2 text-center text-sm font-light tracking-tight">
                    by ELSOUL LABO
                  </p>
                  <p className="mt-4 text-center text-sm">
                    {t('enterprise:EnterpriseSupportFormRow.detail')}
                  </p>
                  <a
                    href={siteConfig.discordInvitationLink}
                    className="mt-4 bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t('enterprise:EnterpriseSupportFormRow.cardButton')}
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
