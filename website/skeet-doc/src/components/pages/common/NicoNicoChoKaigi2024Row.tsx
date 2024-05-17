import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Container from '@/components/common/atoms/Container'
import YouTubeEmbed from '@/components/utils/YouTubeEmbed'
import Image from 'next/image'
import logoImage from '@/assets/img/logo/projects/chokaigi2024_logo_RGB.png'

export default function NicoNicoChoKaigi2024Row() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Container className="pb-48 pt-24 lg:mb-60 lg:pb-60">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center lg:text-center">
          <h2 className="bg-gradient-to-tr from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
            {t('common:NicoNicoChoKaigi2024Row.subtitle')}
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            {t('common:NicoNicoChoKaigi2024Row.title')}
          </p>
          <p className="mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600 dark:text-gray-200">
            {t('common:NicoNicoChoKaigi2024Row.description')}
          </p>
        </div>
        <div className="mx-auto my-12 flex flex-col items-center justify-center">
          <a
            href="https://chokaigi.jp/2024/plan/chochinchirorin/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src={logoImage}
              alt="NicoNico ChoKaigi 2024"
              className="w-48"
              unoptimized
            />
          </a>
        </div>
        <YouTubeEmbed embedId={'LBupi1MmdAM'} />
      </Container>
    </>
  )
}
