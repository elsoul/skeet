import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { initializeApp, FirebaseApp, getApp, getApps } from 'firebase/app'
import { Analytics, logEvent, getAnalytics } from 'firebase/analytics'
import { useTranslation } from 'next-i18next'
import { useRecoilState } from 'recoil'
import { policyAgreedState } from '@/stores/policy'

import firebaseConfig from '@/config/firebase'
import Link from '@/components/routing/Link'
import { Button } from '@/components/common/atoms/Button'

export default function AgreeToPolicy() {
  const [policyAgreed, setPolicyAgreed] = useRecoilState(policyAgreedState)
  const [open, setOpen] = useState(!policyAgreed)
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | undefined>(
    undefined
  )
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined)

  const router = useRouter()
  const { t } = useTranslation()

  const handleAgree = useCallback(() => {
    setOpen(false)
    setPolicyAgreed(true)
  }, [setOpen, setPolicyAgreed])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (policyAgreed) {
      if (!firebaseApp) {
        setFirebaseApp(
          !getApps().length ? initializeApp(firebaseConfig) : getApp()
        )
        if (
          typeof window !== 'undefined' &&
          process.env.NODE_ENV !== 'development'
        ) {
          setAnalytics(getAnalytics(firebaseApp))
        }
      }
      if (firebaseApp && analytics) {
        logEvent(analytics, 'page_view', {
          page_title: document.title,
          page_location: document.URL,
          page_path: router.asPath,
        })
      }
    } else {
      setOpen(true)
    }
  }, [setOpen, policyAgreed, router.asPath, firebaseApp, analytics])

  return (
    <>
      {open && (
        <div className="fixed bottom-4 left-4 z-[999]">
          <div className="h-96 w-64 bg-white shadow-lg dark:bg-black sm:h-72 sm:w-96">
            <div className="flex h-full flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('common:AgreeToPolicy.title')}
                </p>
                <p className="mt-2 text-sm">{t('common:AgreeToPolicy.body')}</p>
                <Link
                  href="/legal/privacy-policy"
                  className="text-xs text-gray-700 underline hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-200"
                >
                  {t('common:privacy')}
                </Link>
              </div>
              <div className="flex flex-row justify-end space-x-2">
                <Button
                  className="text-xs"
                  variant="outline"
                  onClick={() => handleClose()}
                >
                  {t('common:AgreeToPolicy.no')}
                </Button>
                <Button className="text-xs" onClick={() => handleAgree()}>
                  {t('common:AgreeToPolicy.yes')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
