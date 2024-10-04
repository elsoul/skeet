import { unstable_setRequestLocale } from 'next-intl/server'
import {
  ArticlePageProps,
  getDataForArticlePageByFilename,
  getArticleBySlug,
  getArticleForIndex,
} from '@/lib/articles'
import NewsMobileHeader from '../NewsMobileHeader'
import ScrollSyncToc from '@/components/articles/ScrollSyncToc'
import { cn } from '@/lib/utils'
import ArticleContents from '@/components/articles/ArticleContents'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useTranslations } from 'next-intl'
import ArticleIndex from '@/components/articles/ArticleIndex'
import { usePagerData } from '@/hooks/articles/usePagerData'
import ArticlePager from '@/components/articles/ArticlePager'

const { groupDir, generateMetadata, generateStaticParams, getArticlePaths } =
  getDataForArticlePageByFilename(__filename)
export { generateMetadata, generateStaticParams }

export default function NewsArticlePage({
  params: { locale, slug },
}: ArticlePageProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const articleData = getArticleBySlug(
    slug,
    ['title', 'category', 'thumbnail', 'date', 'content'],
    groupDir,
    locale,
  )

  const articlesData = getArticleForIndex(
    groupDir,
    ['title', 'thumbnail', 'date'],
    locale,
  )

  const pagerData = usePagerData({
    slug,
    groupDir,
    locale,
    articlePaths: getArticlePaths(),
  })

  return (
    <>
      <NewsMobileHeader
        articleTitle={articleData.title as string}
        articleContent={articleData.content as string}
      />
      <div className="mx-auto max-w-4xl p-3 py-8 pt-24 text-center">
        <time
          dateTime={articleData.date as string}
          className="text-zinc-500 dark:text-zinc-400"
        >
          {articleData.date}
        </time>
        <h1 className="py-6 text-4xl font-medium tracking-tight md:text-5xl">
          {articleData.title}
        </h1>
      </div>
      <div className="mx-auto max-w-5xl p-3 md:py-6">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={articleData.thumbnail as string}
            unoptimized
            width={160}
            height={90}
            alt={articleData.title as string}
            className="w-full rounded-xl"
          />
        </AspectRatio>
      </div>
      <div className="mx-auto max-w-4xl p-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 md:col-span-2">
            <ArticleContents content={articleData.content as string} />
            <div className="my-16">
              <ArticlePager pagerData={pagerData} />
            </div>
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
      <div className="my-16">
        <h2 className="my-6 px-3 text-center text-3xl font-bold tracking-tight">
          {t('news.latestNews')}
        </h2>
        <ArticleIndex articlesData={articlesData} showItemsNum={3} />
      </div>
    </>
  )
}
