import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'
import { getArticleForIndex } from '@/lib/articles'
import ArticleIndex from '@/components/articles/ArticleIndex'
import HomeHeroRow from './HomeHeroRow'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import GlobalEdgeServersRow from './GlobalEdgeServersRow'
import ManageableMicroServicesRow from './ManageableMicroServicesRow'
import Web3CompatibleRow from './Web3CompatibleRow'
import GreenCodingRow from './GreenCodingRow'
import EvolvingToSLVRow from './EvolvingToSLVRow'

const groupDir = '(home)'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const newsData = getArticleForIndex(
    'news',
    ['title', 'thumbnail', 'date'],
    locale,
  )

  return (
    <>
      <HomeHeroRow />
      <EvolvingToSLVRow />
      <GlobalEdgeServersRow />
      <ManageableMicroServicesRow />
      <Web3CompatibleRow />
      <GreenCodingRow />
      <CTARow />
      <ProductsSlideRow />
      <ArticleIndex articlesData={newsData} showItemsNum={3} />
    </>
  )
}
