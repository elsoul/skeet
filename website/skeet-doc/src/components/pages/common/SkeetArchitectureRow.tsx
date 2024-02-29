import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import SkeetArchiectureV2 from '@/assets/img/product/skeet/SkeetArchitectureV2.jpg'

export default function SkeetArchitectureRow() {
  const { t } = useTranslation()

  return (
    <>
      <Container className="mb-32 sm:mb-48">
        <div className="px-6 pb-10 pt-24 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="bg-gradient-to-tr from-green-400 via-blue-400 to-purple-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
              {t('common:SkeetArchitectureRow.subtitle')}
            </h2>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-6xl">
              {t('common:SkeetArchitectureRow.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-200">
              {t('common:SkeetArchitectureRow.description')}
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={'https://skeet.dev/doc/general/overall-architecture/'}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('common:SkeetArchitectureRow.link')}{' '}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="">
          <a
            href={'https://skeet.dev/doc/general/overall-architecture/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={SkeetArchiectureV2}
              width={1920}
              height={1080}
              // className="shadow-2xl"
              alt="Skeet Architecture"
            />
          </a>
        </div>
      </Container>
    </>
  )
}
