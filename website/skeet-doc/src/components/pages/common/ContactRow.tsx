import { Button } from '@/components/common/atoms/Button'
import Container from '@/components/common/atoms/Container'
import siteConfig from '@/config/site'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function ContactRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Container className="mx-auto flex flex-col items-center justify-center gap-6 py-48 sm:flex-row">
        <div className="max-w-lg  bg-discord shadow">
          <div className="px-4 py-5 sm:p-6">
            <FontAwesomeIcon
              icon={faDiscord}
              size="lg"
              aria-label="Discord icon"
              className="h-9 w-9 text-white"
            />
            <h3 className="mt-2 text-2xl font-bold leading-6 tracking-tight text-white">
              {t('ContactRow.discord.title')}
            </h3>
            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
              <div className="max-w-xl text-sm text-gray-50">
                <p>{t('ContactRow.discord.body')}</p>
              </div>
              <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                <Button
                  color="white"
                  href={siteConfig.discordInvitationLink}
                  target="_blank"
                  rel="noreferrer"
                  className=""
                >
                  {t('ContactRow.discord.button')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg  bg-gray-950 shadow">
          <div className="px-4 py-5 sm:p-6">
            <ChatBubbleLeftRightIcon
              aria-label="Contact Form"
              className="h-9 w-9 text-white"
            />
            <h3 className="mt-2 text-2xl font-bold leading-6 tracking-tight text-white">
              {t('ContactRow.form.title')}
            </h3>
            <div className="mt-2 sm:flex sm:items-start sm:justify-between">
              <div className="max-w-xl text-sm text-gray-50">
                <p>{t('ContactRow.form.body')}</p>
              </div>
              <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                <Button
                  color="white"
                  href={siteConfig.discordInvitationLink}
                  target="_blank"
                  rel="noreferrer"
                  className=""
                >
                  {t('ContactRow.form.button')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
