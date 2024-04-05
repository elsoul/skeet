import {
  GlobeAltIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import logoHorizontal from '@/assets/img/logo/projects/OpenSourceInitiative.svg'
import logoHorizontalInvert from '@/assets/img/logo/projects/OpenSourceInitiativeWhite.svg'

const features = [
  {
    name: 'common:WhyOpenSourceDevelopmentRow.feature1.title',
    description: 'common:WhyOpenSourceDevelopmentRow.feature1.description',
    icon: UserGroupIcon,
  },
  {
    name: 'common:WhyOpenSourceDevelopmentRow.feature2.title',
    description: 'common:WhyOpenSourceDevelopmentRow.feature2.description',
    icon: GlobeAltIcon,
  },
  {
    name: 'common:WhyOpenSourceDevelopmentRow.feature3.title',
    description: 'common:WhyOpenSourceDevelopmentRow.feature3.description',
    icon: WrenchScrewdriverIcon,
  },
]

export default function WhyOpenSourceDevelopmentRow() {
  const { t } = useTranslation()
  return (
    <div className="my-32 pt-64">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center lg:text-center">
          <h2 className="bg-gradient-to-tl from-red-400 via-purple-400 to-blue-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
            {t('common:WhyOpenSourceDevelopmentRow.subtitle')}
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            {t('common:WhyOpenSourceDevelopmentRow.title')}
          </p>
          <p className="mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-200">
            {t('common:WhyOpenSourceDevelopmentRow.description')}
          </p>
        </div>
        <div className="mx-auto mt-6 flex flex-col items-center justify-center">
          <a
            href="https://opensource.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src={logoHorizontal}
              alt="Open Source Initiative"
              className="w-48 dark:hidden"
              unoptimized
            />
            <Image
              src={logoHorizontalInvert}
              alt="Open Source Initiative"
              className="hidden w-48 dark:block"
              unoptimized
            />
          </a>
        </div>
        <div className="mx-auto mt-12 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                  <feature.icon
                    className="h-6 w-6 flex-none"
                    aria-hidden="true"
                  />
                  {t(feature.name)}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-200">
                  <p className="flex-auto">{t(feature.description)}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
