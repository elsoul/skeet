import { setRequestLocale } from 'next-intl/server'
import {
  ArticlePageProps,
  getDataForArticlePageByFilename,
  getArticleBySlug,
  getAllRoutes,
} from '@/lib/articles'
import ScrollSyncToc from '@/components/articles/ScrollSyncToc'
import { cn } from '@/lib/utils'
import ArticleContents from '@/components/articles/ArticleContents'
import DocMobileHeader from '../V1DocMobileHeader'
import { v1docMenuData } from '../v1docNavs'
import ArticlePager from '@/components/articles/ArticlePager'
import { Link } from '@/i18n/routing'
import { DEFAULT_PATHS } from '../../defaultNavs'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { getPagerData } from '@/lib/getPagerData'

const { groupDir, generateMetadata, generateStaticParams } =
  getDataForArticlePageByFilename(__filename)
export { generateMetadata, generateStaticParams }

export default async function V1DocArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = useTranslations()

  const articleData = getArticleBySlug(
    slug,
    ['title', 'thumbnail', 'content'],
    groupDir,
    locale,
  )
  const allRoutes = getAllRoutes(v1docMenuData)
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
          <div className="mb-12 mt-3 flex flex-wrap items-center justify-between rounded-lg bg-yellow-200/30 py-2 pl-4 pr-2 dark:bg-yellow-300/40">
            <p className="text-sm text-yellow-950 dark:text-yellow-100">
              {t('doc.youLookingOldDoc', { version: 1 })}
            </p>
            <Link href={DEFAULT_PATHS.doc}>
              <Button variant="ghost">{t('doc.toNewDoc')}</Button>
            </Link>
          </div>
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
