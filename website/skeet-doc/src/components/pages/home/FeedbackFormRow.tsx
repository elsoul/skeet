import ELSOULLABOAmsterdamOffice from '@/assets/img/photos/office/ELSOULLABOAmsterdamOffice.jpg'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import siteConfig from '@/config/site'

export default function FeedbackFormRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <div className="relative my-48 bg-gray-950 sm:my-96">
        <div className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <Image
            className="h-full w-full object-cover"
            src={ELSOULLABOAmsterdamOffice}
            alt="ELSOUL LABO Amsterdam Office"
            unoptimized
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="bg-gradient-to-tl from-green-500 via-blue-300 to-purple-400 bg-clip-text text-base font-semibold leading-7 text-transparent">
              {t('home:FeedbackFormRow.subtitle')}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('home:FeedbackFormRow.title')}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-300">
              {t('home:FeedbackFormRow.description')}
            </p>
            <div className="mt-8">
              <a
                href={siteConfig.discordInvitationLink}
                rel="noreferrer"
                target="_blank"
                className="inline-flex bg-white/20 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t('home:FeedbackFormRow.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
