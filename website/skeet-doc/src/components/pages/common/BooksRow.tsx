import Container from '@/components/common/atoms/Container'
import Image from 'next/image'
import clsx from 'clsx'

import skeetBookJA from '@/assets/img/product/books/skeetBookJA.jpg'
import skeetBookEN from '@/assets/img/product/books/skeetBookEN.jpg'
import solvBookJA from '@/assets/img/product/books/solvBookJA.jpg'
import solvBookEN from '@/assets/img/product/books/solvBookEN.jpg'

import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

export default function BooksRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])
  return (
    <>
      <Container className="py-24 text-center lg:py-32">
        <h2 className="font-display mx-auto max-w-4xl text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-7xl">
          {t('books')}
        </h2>

        <div className="mb-12 mt-16 lg:mt-24">
          <ul
            role="list"
            className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-10 sm:gap-x-0 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            {[
              [
                {
                  name: 'solv',
                  logo: isJapanese ? solvBookJA : solvBookEN,
                  link: isJapanese
                    ? 'https://zenn.dev/fumisouls/books/971a5ba1212303'
                    : 'https://medium.com/@f.kawasaki/chapter-1-the-complete-guide-to-solana-validators-setting-up-from-scratch-efficient-node-f2984f970dfa',
                },
              ],
              [
                {
                  name: 'Skeet',
                  logo: isJapanese ? skeetBookJA : skeetBookEN,
                  link: isJapanese
                    ? 'https://zenn.dev/fumisouls/books/a27314e5a8428d'
                    : 'https://medium.com/@f.kawasaki/chapter-1-open-the-door-to-serverless-discord-bot-development-with-skeet-and-firebase-%EF%B8%8F-7637f3cbad96',
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
                      <a href={project.link} target="_blank" rel="noreferrer">
                        <Image
                          src={project.logo}
                          alt={project.name}
                          className={clsx('w-full hover:opacity-60')}
                          width={1920}
                          height={1080}
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
      </Container>
    </>
  )
}
