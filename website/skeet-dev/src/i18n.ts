import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales, messageJsons } from '@/app/config'

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  const messages = {}

  for (const key of messageJsons) {
    const message = await import(`../messages/${locale}/${key}.json`)
    Object.assign(messages, message.default)
  }

  return {
    messages,
  }
})
