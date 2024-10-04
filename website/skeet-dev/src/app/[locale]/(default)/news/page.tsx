import { unstable_setRequestLocale } from 'next-intl/server'
import { getDataForPageByFilename, PageProps } from '@/lib/pages'
import { useTranslations } from 'next-intl'

import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'

const { groupDir, generateMetadata } = getDataForPageByFilename(__filename)
export { generateMetadata }

export default function NewsPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const articlesData = getArticleForIndex(
    groupDir,
    ['title', 'thumbnail', 'date'],
    locale,
  )

  return (
    <>
      <h1 className="my-6 px-3 text-center text-3xl font-bold tracking-tight">
        {t('news.title')}
      </h1>
      <ArticleIndex articlesData={articlesData} />
    </>
  )
}
