import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import {
  CommandLineIcon,
  CubeTransparentIcon,
  WindowIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'home:SkeetFeaturesRow.feature1Title',
    description: 'home:SkeetFeaturesRow.feature1Description',
    icon: WindowIcon,
  },
  {
    name: 'home:SkeetFeaturesRow.feature2Title',
    description: 'home:SkeetFeaturesRow.feature2Description',
    icon: CommandLineIcon,
  },
  {
    name: 'home:SkeetFeaturesRow.feature3Title',
    description: 'home:SkeetFeaturesRow.feature3Description',
    icon: CubeTransparentIcon,
  },
]

export default function SkeetFeaturesRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="overflow-hidden py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="bg-gradient-to-tl from-green-500 via-blue-400 to-purple-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
                  {t('home:SkeetFeaturesRow.subtitle')}
                </h2>
                <p className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
                  {t('home:SkeetFeaturesRow.title')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  {t('home:SkeetFeaturesRow.description')}
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold tracking-tight text-gray-900 dark:text-white">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5"
                          aria-hidden="true"
                        />
                        {t(feature.name)}
                      </dt>{' '}
                      <dd className="inline">{t(feature.description)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <Image
                src="https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif"
                alt="Skeet App"
                className="w-[52rem] shadow-xl sm:w-[64rem]"
                width={2432}
                height={1442}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
