import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Container from '@/components/common/atoms/Container'
import YouTubeEmbed from '@/components/utils/YouTubeEmbed'

export default function SkeetRTAYouTubeRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Container className="pb-48 pt-48 lg:pb-60">
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="mx-auto max-w-3xl sm:text-center">
            <h2 className="bg-gradient-to-br  from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
              {t('common:SkeetRTAYouTubeRow.subtitle')}
            </h2>
            <p className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              {t('common:SkeetRTAYouTubeRow.title')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              {t('common:SkeetRTAYouTubeRow.description')}
            </p>
          </div>
        </div>
        <div className="shadow-2xl">
          <YouTubeEmbed embedId={isJapanese ? 'KK-rjjZuXbE' : 'KK-rjjZuXbE'} />
        </div>
      </Container>
    </>
  )
}
