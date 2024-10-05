import { unstable_setRequestLocale } from 'next-intl/server'
import { getDataForPageByFilename, PageProps } from '@/lib/pages'
import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'
import { useTranslations } from 'next-intl'
import HomeHeroRow from './HomeHeroRow'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import GlobalEdgeServersRow from './GlobalEdgeServersRow'
import ManageableMicroServicesRow from './ManageableMicroServicesRow'
import Web3CompatibleRow from './Web3CompatibleRow'

const { generateMetadata } = getDataForPageByFilename(__filename)
export { generateMetadata }

export default function HomePage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const newsData = getArticleForIndex(
    'news',
    ['title', 'thumbnail', 'date'],
    locale,
  )

  return (
    <>
      <HomeHeroRow />
      <GlobalEdgeServersRow />
      <ManageableMicroServicesRow />
      <Web3CompatibleRow />
      <CTARow />
      <ProductsSlideRow />
      <h2 className="my-6 px-3 text-center text-3xl font-bold tracking-tight">
        {t('news.latestNews')}
      </h2>
      <ArticleIndex articlesData={newsData} showItemsNum={3} />
    </>
  )
}
