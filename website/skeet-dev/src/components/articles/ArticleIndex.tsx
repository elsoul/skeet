'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Card } from '@/components/ui/card'

import { ArticleData } from '@/lib/articles'

type Props = {
  articlesData: ArticleData[]
  showItemsNum?: number
}

export default function ArticleIndex({
  articlesData,
  showItemsNum = 12,
}: Props) {
  const t = useTranslations()
  const [visibleArticles, setVisibleArticles] = useState(showItemsNum)
  const loadMoreArticles = () => {
    setVisibleArticles((prev) => prev + showItemsNum)
  }
  const displayedArticles = articlesData.slice(0, visibleArticles)
  return (
    <>
      <div className="mx-auto max-w-7xl p-3 md:py-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {displayedArticles.map(({ article, url }) => (
            <Card key={article.title as string} className="flex flex-col">
              <AspectRatio ratio={16 / 9}>
                <Link href={url} className="hover:opacity-80">
                  <Image
                    src={article.thumbnail as string}
                    unoptimized
                    width={160}
                    height={90}
                    alt={article.title as string}
                    className="w-full rounded-t-xl"
                  />
                </Link>
              </AspectRatio>
              <div className="border-t border-zinc-200 p-4 dark:border-zinc-500">
                <Link href={url} className="hover:opacity-80">
                  <time
                    dateTime={article.date as string}
                    className="text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {article.date}
                  </time>
                  <h2 className="mt-1 font-bold tracking-tight">
                    {article.title}
                  </h2>
                </Link>
              </div>
              <div className="flex-grow" />
              <div className="px-4 pb-3 pt-1">
                <Link href={url}>
                  <Button size="sm" className="w-full">
                    {t('common.readThisArticle')}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        {visibleArticles < articlesData.length && (
          <div className="my-12 flex justify-center">
            <Button onClick={loadMoreArticles}>{t('common.loadMore')}</Button>
          </div>
        )}
      </div>
    </>
  )
}
