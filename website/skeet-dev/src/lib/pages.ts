import { getGroupDir } from './utils'
import { getTranslations } from 'next-intl/server'

export type PageProps = {
  params: Promise<{
    locale: string
  }>
}

export const getDataForPageByFilename = (filename: string) => {
  const groupDir = getGroupDir(filename)
  return {
    groupDir,
    generateMetadata: async ({ params }: PageProps) => {
      const { locale } = await params
      const t = await getTranslations({ locale, namespace: groupDir })

      return {
        title: t('title'),
      }
    },
  }
}
