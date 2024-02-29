import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector from '@/lib/languageDetector'

export default function useRedirect(to?: string) {
  const router = useRouter()
  to = to || router.asPath

  useEffect(() => {
    const detectedLng = languageDetector.detect() as string
    if (to?.startsWith('/' + detectedLng) && router.route === '/404') {
      void router.replace('/' + detectedLng + router.route)
      return
    }

    languageDetector.cache?.(detectedLng)
    void router.replace('/' + detectedLng + to)
  }, [to, router])
}
