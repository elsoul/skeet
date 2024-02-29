import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

import Image from 'next/image'
import solanaLogo from '@/assets/img/logo/projects/SolanaLogoHorizontal.svg'

export default function SolanaMobileStackRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="overflow-hidden py-24 sm:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="bg-gradient-to-tl from-green-500 via-blue-400 to-purple-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
                  {t('common:SolanaMobileStackRow.subtitle')}
                </h2>
                <p className="mt-2 text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
                  {t('common:SolanaMobileStackRow.title')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  {t('common:SolanaMobileStackRow.description')}
                </p>
                <div className="mb-12 mt-12">
                  <ul
                    role="list"
                    className="mt-8 flex flex-col items-start justify-start gap-x-8 gap-y-10 sm:gap-x-0 xl:flex-row xl:gap-x-12 xl:gap-y-0"
                  >
                    {[
                      [
                        {
                          name: 'Solana',
                          logo: solanaLogo,
                          link: 'https://solana.com/',
                        },
                      ],
                      [],
                    ].map((group, groupIndex) => (
                      <li key={`HeroRowLogoCloudList${groupIndex}`}>
                        <ul
                          role="list"
                          className="flex flex-row items-center gap-x-6 sm:gap-x-12"
                        >
                          {group.map((project) => (
                            <li key={project.name} className="flex">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Image
                                  src={project.logo}
                                  alt={project.name}
                                  className={clsx(
                                    'hover:opacity-60 dark:grayscale',
                                    project.name === 'React'
                                      ? 'dark:invert-0'
                                      : 'dark:invert'
                                  )}
                                  width={168}
                                  height={48}
                                  unoptimized
                                />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end lg:order-first">
              <Image
                src="https://storage.googleapis.com/skeet-assets/imgs/frontend/skeet-solana-mobile-stack.gif"
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
