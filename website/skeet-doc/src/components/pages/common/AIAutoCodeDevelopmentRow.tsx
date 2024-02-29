import YouTubeEmbed from '@/components/utils/YouTubeEmbed'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import clsx from 'clsx'

import Image from 'next/image'
import openAILogo from '@/assets/img/logo/projects/OpenAI.svg'
import googleAILogo from '@/assets/img/logo/projects/googleai.png'
import vertexAILogo from '@/assets/img/logo/projects/vertexai.png'
import palm2Logo from '@/assets/img/logo/projects/palm2.png'

export default function AIAutoCodeDevelopmentRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <div className="overflow-hidden py-24 sm:py-32 lg:pb-60 lg:pt-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
            <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
                  {t('common:AIAutoCodeDevelopmentRow.subtitle')}
                </h2>
                <p className="mt-2 text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
                  {t('common:AIAutoCodeDevelopmentRow.title')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                  {t('common:AIAutoCodeDevelopmentRow.description')}
                </p>
                <div className="mb-12 mt-12">
                  <ul
                    role="list"
                    className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-10 sm:gap-x-0 xl:flex-row xl:gap-x-12 xl:gap-y-0"
                  >
                    {[
                      [
                        {
                          name: 'Open AI',
                          logo: openAILogo,
                          link: 'https://openai.com/',
                        },

                        {
                          name: 'Google AI',
                          logo: googleAILogo,
                          link: 'https://ai.google/',
                        },
                      ],
                      [
                        {
                          name: 'PaLM2',
                          logo: palm2Logo,
                          link: 'https://ai.google/discover/palm2/',
                        },
                        {
                          name: 'Vertex AI',
                          logo: vertexAILogo,
                          link: 'https://cloud.google.com/vertex-ai',
                        },
                      ],
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
            <div className="sm:px-6 lg:px-0">
              <div className="shadow-2xl">
                <YouTubeEmbed
                  embedId={isJapanese ? '_aAN1nZ8dwg' : 'e7J5HDhtpE4'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
