import {
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

const features = [
  {
    name: 'home:MainPurposeRow.feature1Title',
    description: 'home:MainPurposeRow.feature1Description',
    icon: RocketLaunchIcon,
  },
  {
    name: 'home:MainPurposeRow.feature2Title',
    description: 'home:MainPurposeRow.feature2Description',
    icon: GlobeAltIcon,
  },
  {
    name: 'home:MainPurposeRow.feature3Title',
    description: 'home:MainPurposeRow.feature3Description',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'home:MainPurposeRow.feature4Title',
    description: 'home:MainPurposeRow.feature4Description',
    icon: ShieldCheckIcon,
  },
]

export default function MainPurposeRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="max-w-full">
        <div className="relative isolate overflow-hidden">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-0 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-1/2 sm:top-0 sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.08"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#bae6fd" />
                <stop offset={1} stopColor="#f0f9ff" />
              </radialGradient>
            </defs>
          </svg>
          <div className="py-24 sm:pb-64 sm:pt-96">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto lg:text-center">
                <h2 className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
                  {t('home:MainPurposeRow.subtitle')}
                </h2>
                <p className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
                  {t('home:MainPurposeRow.title1')} <br />
                  {t('home:MainPurposeRow.title2')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                  {t('home:MainPurposeRow.description1')} <br />
                  {t('home:MainPurposeRow.description2')}
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-xl font-bold leading-7 tracking-tight text-gray-900 dark:text-white">
                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-1">{t(feature.name)}</p>
                      </dt>
                      <dd className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-100">
                        {t(feature.description)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
