import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByFilename, PageProps } from '@/lib/pages'

import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'

const { groupDir, generateMetadata } = getDataForPageByFilename(__filename)
export { generateMetadata }

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const articlesData = getArticleForIndex(
    groupDir,
    ['title', 'thumbnail', 'date'],
    locale,
  )

  return (
    <>
      <ArticleIndex articlesData={articlesData} />
    </>
  )
}
