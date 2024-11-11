import { routing } from '@/i18n/routing'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, messageJsons } from '@/app/config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = defaultLocale
  }

  const messages = {}

  for (const key of messageJsons) {
    const message = await import(`../../messages/${locale}/${key}.json`)
    Object.assign(messages, message.default)
  }

  return {
    locale,
    messages
  }
})
