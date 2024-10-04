import { getTranslations } from 'next-intl/server'
import { locales } from './config'
import appInfo from '@appInfo'

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({
    locale: locale ? locale : locales[0],
    namespace: 'metadata',
  })

  return {
    metadataBase: new URL(
      process.env.NODE_ENV === 'production'
        ? `https://${appInfo.domain}`
        : 'http://localhost:4242',
    ),
    generator: appInfo.copyright,
    applicationName: t('appTitle'),
    keywords: t('keywords'),
    title: {
      template: `%s | ${t('appTitle')}`,
      default: t('defaultTitle'),
    },
    description: t('defaultDescription'),
    openGraph: {
      title: {
        template: `%s | ${t('appTitle')}`,
        default: t('defaultTitle'),
      },
      description: t('defaultDescription'),
      locale,
      type: 'website',
    },
    twitter: {
      creator: appInfo.twitterId,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
