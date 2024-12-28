import { setRequestLocale } from 'next-intl/server'
import {
  ArticlePageProps,
  getArticleBySlug,
  getAllRoutes,
  getDataForArticlePageByGroupDir,
} from '@/lib/articles'
import ScrollSyncToc from '@/components/articles/ScrollSyncToc'
import { cn } from '@/lib/utils'
import ArticleContents from '@/components/articles/ArticleContents'
import DocMobileHeader from '../V2DocMobileHeader'
import { v2docMenuData } from '../v2docNavs'
import ArticlePager from '@/components/articles/ArticlePager'
import { getPagerData } from '@/lib/getPagerData'
import ShowOldDoc from '@/components/articles/ShowOldDoc'

const groupDir = 'v2doc'
const { generateMetadata, generateStaticParams } =
  getDataForArticlePageByGroupDir(groupDir)
export { generateMetadata, generateStaticParams }

export default async function V2DocArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const articleData = getArticleBySlug(
    slug,
    ['title', 'thumbnail', 'content'],
    groupDir,
    locale,
  )
  const allRoutes = getAllRoutes(v2docMenuData)
  const articlePaths = allRoutes.map(
    (route) => `/${route.split('/').slice(2).join('/')}`,
  )

  const pagerData = getPagerData({
    slug,
    groupDir,
    locale,
    articlePaths,
  })

  return (
    <>
      <DocMobileHeader articleContent={articleData.content as string} />

      <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ShowOldDoc version={2} />
          <h1 className="text-3xl font-bold tracking-tight">
            {articleData.title}
          </h1>
          <ArticleContents content={articleData.content as string} />
          <div className="my-16">
            <ArticlePager pagerData={pagerData} />
          </div>
        </div>
        <div className="max-h-full md:col-span-1">
          <div
            className={cn(
              'scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-950 dark:scrollbar-thumb-zinc-600',
              'hidden max-h-[calc(100vh-10rem)] md:sticky md:top-32 md:block',
            )}
          >
            <ScrollSyncToc rawMarkdownBody={articleData.content as string} />
          </div>
        </div>
      </div>
    </>
  )
}
