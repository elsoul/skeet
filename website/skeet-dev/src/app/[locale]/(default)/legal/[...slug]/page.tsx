import { setRequestLocale } from 'next-intl/server'
import {
  ArticlePageProps,
  getArticleBySlug,
  getDataForArticlePageByGroupDir,
} from '@/lib/articles'
import ScrollSyncToc from '@/components/articles/ScrollSyncToc'
import ArticleContents from '@/components/articles/ArticleContents'
import { cn } from '@/lib/utils'

const groupDir = 'legal'
const { generateMetadata, generateStaticParams } =
  getDataForArticlePageByGroupDir(groupDir)
export { generateMetadata, generateStaticParams }

export default async function LegalArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const articleData = getArticleBySlug(
    slug,
    ['title', 'content'],
    groupDir,
    locale,
  )

  return (
    <>
      <div className="mx-auto max-w-4xl overflow-visible p-3 md:py-8">
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 md:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {articleData.title}
            </h1>
            <ArticleContents content={articleData.content as string} />
          </div>
          <div className="max-h-full p-4 md:col-span-1">
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
      </div>
    </>
  )
}
